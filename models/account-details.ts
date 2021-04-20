import { ISecurity, Security } from '@modules/admin/models/security';
import { UserRole } from '@enums/user-role';
import { StatusType } from '@enums/status-type';
import { IVerification, Verification } from '@modules/admin/models/verification';
import { SelectOption } from '@models/select-option';
import { AccountDetailsStatus } from '@modules/admin/enums/account-details-status';

const ACTIVE = 'Active';
const PENDING = 'Pending';
const BLOCKED = 'Blocked';

export interface IAccountDetails {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  smsPhoneNumber: string;
  paCity: string;
  paCountryIso2: string;
  paAddress: string;
  security: ISecurity;
  status: AccountDetailsStatus;
  roleName: UserRole;
  overallBalance: string;
  lastLoginAt: string;
  createdAt: string;
  dateOfBirth: string;
  dateOfBirthYear: number;
  dateOfBirthMonth: number;
  dateOfBirthDay: number;
  lastLoginIp: string;
  verifications: IVerification[];
}

export class AccountDetails {
  public uid: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public smsPhoneNumber: string;
  public paCity: string;
  public paCountryIso2: string;
  public paAddress: string;
  public security: Security;
  public status: AccountDetailsStatus;
  public roleName: UserRole;
  public overallBalance: string;
  public lastLoginAt: string;
  public createdAt: string;
  public dateOfBirth: string;
  public dateOfBirthYear: number;
  public dateOfBirthMonth: number;
  public dateOfBirthDay: number;
  public lastLoginIp: string;
  public verifications: Verification[];

  constructor(data: IAccountDetails) {
    this.uid = data.uid;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.smsPhoneNumber = data.smsPhoneNumber;
    this.paCity = data.paCity;
    this.paCountryIso2 = data.paCountryIso2;
    this.paAddress = data.paAddress;
    this.status = data.status;
    this.roleName = data.roleName;
    this.overallBalance = data.overallBalance;
    this.lastLoginAt = data.lastLoginAt;
    this.createdAt = data.createdAt;
    this.dateOfBirth = data.dateOfBirth;
    this.dateOfBirthYear = data.dateOfBirthYear;
    this.dateOfBirthMonth = data.dateOfBirthMonth;
    this.dateOfBirthDay = data.dateOfBirthDay;
    this.lastLoginIp = data.lastLoginIp;

    if (data.security) {
      this.security = new Security(data.security);
    }

    if (data.verifications) {
      this.verifications = data.verifications.map((i: IVerification) => new Verification(i));
    }
  }

  public getFullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  public getStatusName(): string {
    switch (this.status.toLowerCase()) {
      case AccountDetailsStatus.pending: {
        return PENDING;
      }
      case AccountDetailsStatus.active: {
        return ACTIVE;
      }
      default: {
        return status;
      }
    }
  }

  public getStatusType(): StatusType {
    switch (this.status.toLowerCase()) {
      case AccountDetailsStatus.pending: {
        return StatusType.info;
      }
      case AccountDetailsStatus.active: {
        return StatusType.success;
      }
      default: {
        return StatusType.info;
      }
    }
  }

  public getDocumentsString(): string {
    if (this.verifications) {
      return this.verifications.map((value: Verification) => value.getTypeName()).join(', ');
    }

    return '';
  }

  public static getSelectOptions(): SelectOption[] {
    return [
      { id: AccountDetailsStatus.active, value: ACTIVE },
      { id: AccountDetailsStatus.pending, value: PENDING },
      { id: AccountDetailsStatus.blocked, value: BLOCKED },
    ];
  }
}
