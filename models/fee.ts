import { TransactionStatus } from '@enums/transaction-status';
import { FeePurpose } from '@enums/fee-purpose';

export interface IFee {
  amount?: string;
  description?: string;
  purpose?: FeePurpose;
  status?: TransactionStatus;
  id?: number;
  transferFeeId?: number;
  currencyCode?: string;
  base?: string;
  percent?: string;
  min?: string;
  max?: string;
  delete?: boolean;
}

export class Fee {
  public amount: string;
  public description: string;
  public purpose: FeePurpose;
  public status: TransactionStatus;
  public id: number;
  public transferFeeId: number;
  public currencyCode: string;
  public base: string;
  public percent: string;
  public min: string;
  public max: string;
  public delete: boolean;

  constructor(data: IFee) {
    this.amount = data.amount;
    this.description = data.description;
    this.purpose = data.purpose;
    this.status = data.status;
    this.id = data.id;
    this.transferFeeId = data.transferFeeId;
    this.currencyCode = data.currencyCode;
    this.base = data.base;
    this.percent = data.percent;
    this.min = data.min;
    this.max = data.max;
    this.delete = data.delete;
  }
}
