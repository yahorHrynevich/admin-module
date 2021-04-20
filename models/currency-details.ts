export interface ICurrencyDetails {
  circulatingSupply?: string;
  maxSupply?: string;
  updatedAt?: string;
  minTransferAmount?: number;
}

export class CurrencyDetails {
  public circulatingSupply: string;
  public maxSupply: string;
  public updatedAt: string;
  public minTransferAmount?: number;

  constructor(data: ICurrencyDetails) {
    this.circulatingSupply = data.circulatingSupply;
    this.maxSupply = data.maxSupply;
    this.updatedAt = data.updatedAt;
    this.minTransferAmount = data.minTransferAmount;
  }
}
