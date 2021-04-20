export interface ITotalWalletBalances {
  currency: string;
  virtualAmount: string;
  realAmount: string;
}

export class TotalWalletBalances {
  public currency: string;
  public virtualAmount: string;
  public realAmount: string;

  constructor(data: ITotalWalletBalances) {
    this.currency = data.currency;
    this.virtualAmount = data.virtualAmount;
    this.realAmount = data.realAmount;
  }
}
