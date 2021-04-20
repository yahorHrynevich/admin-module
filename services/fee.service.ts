import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API } from '@modules/admin/api';
import { map } from 'rxjs/operators';
import { IHttpResponse } from '@interfaces/http-response.interface';
import { HttpClient } from '@angular/common/http';
import { Fee, IFee } from '@modules/admin/models/fee';
import { SpinnerService } from '@services/spinner.service';
import { ITransferFee, TransferFee } from '@modules/admin/models/transfer-fee';
import { IRate, Rate } from '@modules/admin/models/rate';

const BUY_OPERATION_NUMBER = 4;

@Injectable()
export class FeeService {
  public operationId$ = new BehaviorSubject(BUY_OPERATION_NUMBER);
  private feesAdmin$: BehaviorSubject<Fee[]> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService,
  ) {
  }

  public loadFees(id) {
    return this.spinnerService.makeObservableWithSpinner(this.http.get(API.feeAdmin(id)))
      .pipe(
        map((resp: IHttpResponse<IFee[]>) => resp.data.map((i: IFee) => new Fee(i))),
      )
      .subscribe((data: Fee[]) => {
        this.feesAdmin$.next(data);
      });
  }

  public get fees$(): Observable<Fee[]> {
    return this.feesAdmin$.asObservable();
  }

  public getFeesValue(): Fee[] {
    return this.feesAdmin$.value;
  }

  public sendFee(id, fees): Observable<any> {
    return this.http.post(API.feeSendAdmin(id), {
      name: 'Fee operation',
      parameters: fees,
      relations: [
        {
          userGroupId: 1,
          attached: true,
        },
      ],
    });
  }

  public getRates(params): Observable<Rate> {
    return this.http.get(API.rates, { params }).pipe(
      map((resp: IHttpResponse<IRate[]>) => new Rate(resp.data[0])),
    );
  }

  public setRates(rates): Observable<any> {
    const data = rates.map((rate: Rate) => ({
      id: rate.id,
      value: rate.value.toString(),
      exchangeMargin: rate.exchangeMargin.toString(),
    }));

    return this.http.put(API.ratesAdmin, { data });
  }

  public loadFeeOperations(): Observable<TransferFee[]> {
    return this.http.get(API.feesAdmin)
      .pipe(
        map((resp: IHttpResponse<ITransferFee[]>) => resp.data.map((i: ITransferFee) => new TransferFee(i))),
      );
  }
}
