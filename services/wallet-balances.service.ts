import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '@modules/admin/api';
import { Observable } from 'rxjs';
import { TotalWalletBalances, ITotalWalletBalances } from '@modules/admin/models/total-wallet-balances';
import { map } from 'rxjs/operators';
import { IHttpResponse } from '@interfaces/http-response.interface';
import { HotWalletBalances, IHotWalletBalances } from '@modules/admin/models/hot-wallet-balances';

@Injectable()
export class WalletBalancesService {
  constructor(
    private http: HttpClient,
  ) {
  }

  public loadHotWallets(): Observable<HotWalletBalances[]>{
    return this.http.get(API.hotWallets)
      .pipe(
        map((resp: IHttpResponse<IHotWalletBalances[]>) => resp.data.map((i: IHotWalletBalances) => new HotWalletBalances(i))),
      );
  }

  public loadBalances(): Observable<TotalWalletBalances[]> {
    return this.http.get(API.balance)
      .pipe(
        map((resp: IHttpResponse<ITotalWalletBalances[]>) => resp.data.map((i:ITotalWalletBalances) => new TotalWalletBalances(i))),
      );
  }
}
