import { Fee, IFee } from '@modules/admin/models/fee';

export interface IFees {
  list?: IFee[];
  total?: string;
}

export class Fees {
  public list: Fee[];
  public total: string;

  constructor(data: IFees) {
    this.list = data.list.map((i: IFee) => new Fee(i));
    this.total = data.total;
  }
}
