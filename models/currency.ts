import { Constants } from '@constants/constants';
import { API } from '@modules/admin/api';
import { CurrencyDetails, ICurrencyDetails } from '@modules/admin/models/currency-details';

export interface ICurrency {
  id?: number;
  name?: string;
  code?: string;
  sign?: string;
  logoPath?: string;
  color?: string;
  decimalPlaces?: number;
  type?: CurrencyType;
  active?: boolean;
  details?: ICurrencyDetails;
}

export enum CurrencyType {
  fiat = 'fiat',
  crypto = 'crypto',
}

export class Currency {
  public static SIGNS = {
    USD: '$',
    EUR: '€',
  };

  public id: number;
  public name: string;
  public code: string;
  public sign: string;
  public logoPath: string;
  public color: string;
  public decimalPlaces: number;
  public type: CurrencyType;
  public active: boolean;
  public details: CurrencyDetails;

  constructor(data: ICurrency) {
    this.id = data.id;
    this.name = data.name;
    this.code = data.code;
    this.sign = data.sign || Currency.SIGNS[data.code];
    this.logoPath = API.currencyLogo + data.code;
    this.color = data.color;
    this.decimalPlaces = data.decimalPlaces || Constants.CURRENCY_DECIMAL_PLACES_DEFAULT;
    this.type = data.type;
    this.active = data.active;
    if (data.details) {
      this.details = new CurrencyDetails(data.details);
    }
  }
}
