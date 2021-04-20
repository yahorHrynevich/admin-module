import { Component, OnDestroy } from '@angular/core';
import { Currency, ICurrency } from '@modules/admin/models/currency';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { onlyNumber } from '@validators/only-numder.validator';
import { CurrencyService } from '@services/currency.service';
import { NotificationService } from '@services/notification.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnDestroy {
  public currencies: Currency[];
  public noItemsLabel: string = 'No Item';
  public form: FormGroup;
  public unsubscribe$: Subject<void> = new Subject<void>();
  private minTransferAmountControl: FormControl;

  constructor(
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private spinner: SpinnerService,
  ) {
    this.form = this.formBuilder.group({});
    this.currencyService.loadCurrenciesForAdmin()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Currency[]) => {
        this.currencies = data;
        this.initForm();
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public submit(): void {
    if (this.form.valid) {
      Object.keys(this.form.value).forEach((key: string, i: number) =>
        this.currencies[i].details.minTransferAmount = Number(this.form.value[key]),
      );
      this.spinner.makeObservableWithSpinner(this.currencyService.saveCurrencies(this.currencies))
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.notificationService.success('The minimum transfer amount has been changed'));
    }
  }

  private initForm(): void {
    this.currencies.forEach((currency: ICurrency) => {
      this.minTransferAmountControl = new FormControl(
        currency.details.minTransferAmount
          ? currency.details.minTransferAmount.toString()
          : '0', [Validators.required, Validators.min(0), onlyNumber]);

      this.form.addControl(currency.code.toLowerCase(), this.minTransferAmountControl);
    });
  }
}
