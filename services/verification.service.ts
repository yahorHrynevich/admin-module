import { Injectable } from '@angular/core';
import { Verification } from '@modules/admin/models/verification';
import { Observable, of, zip } from 'rxjs';
import { IUsersFile, UsersFile } from '@modules/admin/models/users-file';
import { map, tap } from 'rxjs/operators';
import { VerificationFile } from '@modules/admin/models/verification-file';
import { IHttpResponse } from '@interfaces/http-response.interface';
import { HttpClient } from '@angular/common/http';
import { API } from '@modules/admin/api';

@Injectable()
export class VerificationService {
  private readonly rejectReasonCode = 1;
  private readonly rejectReasonMessage = 'Verification rejected';

  public verification: Verification;

  constructor(
    private http: HttpClient,
  ) {

  }

  public getFiles(verificationFiles?: VerificationFile[]): Observable<UsersFile[]> {
    if (!verificationFiles.length) {
      return of([]);
    }

    return zip(...verificationFiles.map((file: VerificationFile) => this.getFile(file.fileId)));
  }

  public getFile(fileId: number): Observable<UsersFile> {
    return this.http.get(API.getFile(fileId)).pipe(
      map((resp: IHttpResponse<IUsersFile>) => new UsersFile(resp.data)),
    );
  }

  public loadFile(usersFile: UsersFile): Observable<Blob> {
    return this.http.get(API.getBinaryFile(usersFile.id), { responseType: 'blob' }).pipe(
      tap((data: Blob) => {
        const downloadURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = usersFile.filename;
        link.click();
      }),
    );
  }

  public changeVerificationStatusOnApproved(verificationId: number): Observable<any> {
    return this.http.post(API.userVerificationApprove(verificationId), null);
  }

  public changeVerificationStatusOnCancelled(verificationId: number): Observable<any> {
    return this.http.post(API.userVerificationCancel(verificationId), {
      reason: this.rejectReasonCode,
      message: this.rejectReasonMessage,
    });
  }
}
