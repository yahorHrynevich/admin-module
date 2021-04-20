import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Subject, Observable } from 'rxjs';
import { NotificationService } from '@services/notification.service';
import { SpinnerService } from '@services/spinner.service';
import { takeUntil } from 'rxjs/operators';
import { onlyNumber } from '@validators/only-numder.validator';
import { Rate } from '@modules/client/models/rate';
import { FeeService } from '@modules/admin/services/fee.service';

interface IParam {
  ['filter[currencyFrom.code]']: string;
  ['filter[currencyTo.code]']: string;
}

@Component({
  selector: 'app-margin-fee',
  templateUrl: './margin-fee.component.html',
  styleUrls: ['./margin-fee.component.scss'],
})
export class MarginFeeComponent implements OnDestroy {
  public rates: Rate[];
  public noItemsLabel: string = 'No Item';
  public form: FormGroup;
  public unsubscribe$: Subject<void> = new Subject<void>();
  private percent: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private spinner: SpinnerService,
    private feeService: FeeService,
  ) {
    this.getRates();
    this.form = this.formBuilder.group({});
  }

  private getRates(): void {
    const params: IParam[] = [
      { 'filter[currencyFrom.code]': 'EUR', 'filter[currencyTo.code]': 'ETH' },
      { 'filter[currencyFrom.code]': 'EUR', 'filter[currencyTo.code]': 'RUB' },
      { 'filter[currencyFrom.code]': 'ETH', 'filter[currencyTo.code]': 'EUR' },
    ];

    const rates$: Observable<Rate>[] = params.map((param: IParam) => this.feeService.getRates(param));
    forkJoin(rates$).pipe(takeUntil(this.unsubscribe$)).subscribe((result: Rate[]) => {
      this.rates = result;
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
        this.rates[i].exchangeMargin = Number(this.form.value[key]),
      );

      this.spinner.makeObservableWithSpinner(this.feeService.setRates(this.rates))
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.notificationService.success('The margin fee has been changed'));
    }
  }

  private initForm(): void {
    this.rates.forEach((rate: Rate) => {
      this.percent = new FormControl(
        rate.exchangeMargin
          ? rate.exchangeMargin.toString()
          : '0', [Validators.required, Validators.min(0), onlyNumber]);

      this.form.addControl(`${ rate.currencyFrom.code }_${ rate.currencyTo.code }`, this.percent);
    });
  }
}
