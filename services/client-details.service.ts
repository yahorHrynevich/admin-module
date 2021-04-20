import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IHttpResponse } from '@interfaces/http-response.interface';
import { AccountDetails, IAccountDetails } from '@modules/admin/models/account-details';
import { HttpClient } from '@angular/common/http';
import { API } from '@modules/admin/pages/users/clients/client-details/api';
import { AuthService } from '@services/auth.service';
import { IVerification, Verification } from '@modules/admin/models/verification';

@Injectable()
export class ClientDetailsService {
  private userDetails$: BehaviorSubject<AccountDetails> = new BehaviorSubject<AccountDetails>(null);
  private verificationsSubject: Subject<Verification[]> = new BehaviorSubject<Verification[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.authService.logout$.subscribe(() => {
      this.clearUserClientInfo();
    });
  }

  public get accountDetails$(): Observable<AccountDetails> {
    return this.userDetails$.asObservable();
  }

  public get verifications$(): Observable<Verification[]> {
    return this.verificationsSubject.asObservable();
  }

  public getAccountDetailsValue(): AccountDetails {
    return this.userDetails$.value;
  }

  public loadAccountDetails(userUid: string): void {
    this.http.get(API.users(userUid))
      .pipe(map((resp: IHttpResponse<IAccountDetails>) => new AccountDetails(resp.data)))
      .subscribe((accountDetails: AccountDetails) => {
        this.userDetails$.next(accountDetails);
        this.loadUserVerifications(accountDetails.uid);
      });
  }

  public updateClientDetails(userUid: string, data: any): Observable<any> {
    return this.http.put(API.saveUser(userUid), { data });
  }

  public clearUserClientInfo(): void {
    this.userDetails$.next(null);
    this.verificationsSubject.next([]);
  }

  private loadUserVerifications(uid: string): void {
    this.http.get(API.userVerifications(uid))
      .pipe(map((resp: IHttpResponse<IVerification[]>) => resp.data.map((i: IVerification) => new Verification(i))))
      .subscribe((verifications: Verification[]) => this.verificationsSubject.next(verifications));
  }
}
