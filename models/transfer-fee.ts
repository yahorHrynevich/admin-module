export interface ITransferFee {
  createdAt: string;
  id: number;
  name: string;
  requestSubject: string;
}

export class TransferFee {
  public createdAt: string;
  public id: number;
  public name: string;
  public requestSubject: string;

  constructor(data: ITransferFee) {
    this.createdAt = data.createdAt;
    this.id = data.id;
    this.name = data.name;
    this.requestSubject = data.requestSubject;
  }
}
