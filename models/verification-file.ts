export interface IVerificationFile {
  id: number;
  verificationId: number;
  fileId: number;
  path: string;
}

export class VerificationFile {
  public id: number;
  public verificationId: number;
  public fileId: number;
  public path: string;

  constructor(data: IVerificationFile) {
    this.id = data.id;
    this.verificationId = data.verificationId;
    this.fileId = data.fileId;
    this.path = data.path;
  }
}
