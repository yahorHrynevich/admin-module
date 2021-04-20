import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from '@services/notification.service';
import { SpinnerService } from '@services/spinner.service';
import { Subject } from 'rxjs';
import { CurrencyService } from '@services/currency.service';
import { Currency } from '@modules/admin/models/currency';
import { Fee } from '@modules/admin/models/fee';
import { SelectOption } from '@models/select-option';
import { ModalNavigationService } from '@services/modal-navigation.service';
import { FeeService } from '../../../admin/services/fee.service';

@Component({
  selector: 'app-add-remove-fee',
  templateUrl: './add-remove-fee.component.html',
  styleUrls: ['./add-remove-fee.component.scss'],
})
export class AddRemoveFeeComponent implements OnInit {
  @Input()
  public type: 'add' | 'delete' = 'add';

  public form: FormGroup;
  public currenciesStubs: SelectOption[];

  private operationNumber: number;
  private currencies: Currency[];

  private fees: Fee[];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
    private feeService: FeeService,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService,
    private currencyService: CurrencyService,
    private modalNavigationService: ModalNavigationService,
  ) {
  }

  public ngOnInit(): void {
    this.feeService.operationId$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.operationNumber = value;
        this.initForm();
        this.getFees();
      });
  }

  public close(): void {
    this.modalNavigationService.closeModal();
  }

  public save(): void {
    const fee: Fee[] = [new Fee({
      currencyCode: this.form.get('currencyCode').value,
      base: '0.01',
      percent: '0.01',
      min: '0.01',
      max: '0.01',
      delete: false,
    })];

    const message = 'The fees amount has been added';
    this.sendQuery(fee, message);
  }

  public remove(): void {
    const fee: Fee[] = [new Fee({
      currencyCode: this.form.get('currencyCode').value,
      delete: true,
    })];

    const message = 'The fees amount has been removed';
    this.sendQuery(fee, message);
  }

  private getFees(): void {
    if (this.feeService.getFeesValue()) {
      this.fees = this.feeService.getFeesValue();
      this.loadCurrencies();
    } else {
      this.modalNavigationService.closeModal();
    }
  }

  private loadCurrencies(): void {
    this.spinnerService.makeObservableWithSpinner(this.currencyService.loadCurrenciesForAdmin())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Currency[]) => {
        this.currencies = this.filterCurrencies(data);

        if (this.currencies.length) {
          this.initStubs();
        }
      });
  }

  private filterCurrencies(currencies: Currency[]): Currency[] {
    switch (this.type) {
      case 'add': {
        return currencies.filter((currency: Currency) => !this.fees.find((fee: Fee) => (fee.currencyCode === currency.code)));
      }
      case 'delete': {
        return currencies.filter((currency: Currency) => this.fees.find((fee: Fee) => (fee.currencyCode === currency.code)));
      }
      default : {
        return currencies;
      }
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      currencyCode: [null, [Validators.required]],
    });
  }

  private initStubs(): void {
    this.currenciesStubs = this.currencies.map((currency: Currency) => new SelectOption({
      id: currency.code,
      value: currency.code,
    }));

    this.form.get('currencyCode').setValue(this.currenciesStubs[0].value);
  }

  private sendQuery(fee, message: string) {
    this.spinnerService.makeObservableWithSpinner(this.feeService.sendFee(this.operationNumber, fee))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.notificationService.success(message);
        this.feeService.loadFees(this.operationNumber);
        this.modalNavigationService.closeModal();
      });
  }
}
