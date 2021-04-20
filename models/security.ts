export interface ISecurity {
  emailVerified: boolean;
  smsPhoneNumberVerified: boolean;
}

export class Security {
  public emailVerified: boolean;
  public smsPhoneNumberVerified: boolean;

  constructor(data: ISecurity) {
    this.emailVerified = data.emailVerified;
    this.smsPhoneNumberVerified = data.smsPhoneNumberVerified;
  }
}
