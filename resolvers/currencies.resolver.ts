import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '@modules/admin/models/currency';
import { CURRENCY_COLORS, CURRENCY_SIGNS } from '@modules/admin/constants/currencies';
import { tap } from 'rxjs/operators';
import { SpinnerService } from '@services/spinner.service';
import { CurrencyService } from '@services/currency.service';

@Injectable()
export class CurrenciesResolver implements Resolve<any> {
  constructor(
    private spinner: SpinnerService,
    private currencyService: CurrencyService,
  ) {
  }

  resolve(): Observable<any> | Promise<any> | String {
    return this.spinner.makeObservableWithSpinner(this.currencyService.loadCurrencies().pipe(
      tap((currencies: Currency[]) => {
        currencies.forEach((currency: Currency, i: number) => {
          currency.color = CURRENCY_COLORS[i % CURRENCY_COLORS.length];
          currency.sign = CURRENCY_SIGNS[currency.code];
        });

        this.currencyService.setCurrencies(currencies);
      }),
    ));
  }
}
