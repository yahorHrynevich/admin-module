export interface IHotWalletBalances {
  id: number;
  number: string;
  balance: string;
  currencyCode: string;
}

export class HotWalletBalances {
  public id: number;
  public number: string;
  public balance: string;
  public currencyCode: string;

  constructor(data: IHotWalletBalances) {
    this.id = data.id;
    this.number = data.number;
    this.currencyCode = data.currencyCode;
    this.balance = data.balance;
  }
}
