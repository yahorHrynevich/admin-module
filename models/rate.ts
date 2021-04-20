import { Currency, ICurrency } from '@modules/admin/models/currency';
import { IRatesHistoryPoint, RatesHistoryPoint } from '@modules/admin/models/rates-history-point';
import { LinearChartPoint } from '@models/linear-char-point';

export interface IRate {
  id?: number;
  value?: string;
  exchangeMargin?: string;
  marketCapacity?: string;
  percentChange24h?: string;
  currencyFrom?: ICurrency;
  currencyTo?: ICurrency;
  ratesHistory?: IRatesHistoryPoint[];
  volume24h: string;
}

export class Rate {
  public id: number;
  public value: number;
  public exchangeMargin: number;
  public marketCapacity: number;
  public percentChange24h: number;
  public currencyFrom: Currency;
  public currencyTo: Currency;
  public ratesHistory: LinearChartPoint[];
  public volume24h: string;
  public follow: boolean;

  constructor(data: IRate) {
    this.id = data.id;
    this.value = Number(data.value);
    this.exchangeMargin = Number(data.exchangeMargin);
    this.marketCapacity = Number(data.marketCapacity);
    this.percentChange24h = Number(data.percentChange24h);
    this.currencyFrom = new Currency(data.currencyFrom);
    this.currencyTo = new Currency(data.currencyTo);
    this.ratesHistory = data.ratesHistory.map((point: IRatesHistoryPoint) => new RatesHistoryPoint(point).toLineChartPoint());
    this.volume24h = data.volume24h;
    this.follow = false;
  }
}
