import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IHttpResponse } from '@interfaces/http-response.interface';
import { AccountDetails, IAccountDetails } from '@modules/admin/models/account-details';
import { HttpClient } from '@angular/common/http';
import { Links } from '@models/links';
import { Pagination } from '@models/pagination';
import { IParams } from '@interfaces/params.interface';
import { API } from '@modules/admin/pages/verification/verification-list/api';

@Injectable()
export class VerificationListService {
  constructor(
    private http: HttpClient,
  ) {
  }

  public getVerifications(params: IParams): Observable<IHttpResponse<AccountDetails[]>> {
    Object.keys(params).forEach((key: string) => {
      if (!params[key]) {
        delete params[key];
      }
    });
    return this.http.get(API.verifications(), { params })
      .pipe(
        map((resp: IHttpResponse<IAccountDetails[]>) => ({
          data: resp.data.map((i: IAccountDetails) => new AccountDetails(i)),
          links: new Links(resp.links),
          pagination: new Pagination(resp.pagination),
        })),
      );
  }
}
