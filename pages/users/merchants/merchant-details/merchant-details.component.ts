import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountDetails } from '@modules/admin/models/account-details';
import { UserRole } from '@enums/user-role';
import { AccountDetailsStatus } from '@modules/admin/enums/account-details-status';

@Component({
  selector: 'app-merchant-details',
  templateUrl: './merchant-details.component.html',
  styleUrls: ['./merchant-details.component.scss'],
})
export class MerchantDetailsComponent {
  public userDetails: AccountDetails;

  public form: FormGroup;

  constructor(
    private router: Router,
  ) {
    this.initUserDetails();
  }

  public goBack(): void {
    this.router.navigate(['admin', 'merchants', 'clients']);
  }

  private initUserDetails(): void {
    this.userDetails = new AccountDetails({
      firstName: 'Name',
      lastName: 'LastName',
      roleName: UserRole.merchant,
      email: 'user@gmail.com',
      uid: '0694f80c-a548-4a5d-ac13-8adb13981241',
      smsPhoneNumber: '333333333',
      paCity: 'Minsk',
      paCountryIso2: 'Belarus',
      paAddress: 'Minsk',
      security: {
        emailVerified: false,
        smsPhoneNumberVerified: false,
      },
      status: AccountDetailsStatus.pending,
      overallBalance: '1000',
      lastLoginAt: new Date().toString(),
      createdAt: new Date().toString(),
      dateOfBirth: new Date().toString(),
      dateOfBirthYear: 1960,
      dateOfBirthMonth: 2,
      dateOfBirthDay: 2,
      lastLoginIp: '127.127.12.33',
      verifications: [],
    });
  }
}
