import { StatusType } from '@enums/status-type';
import { IVerificationFile, VerificationFile } from '@modules/admin/models/verification-file';
import { SelectOption } from '@models/select-option';
import { VerificationStatus } from '@modules/admin/enums/verification-status';
import { VerificationType } from '@modules/admin/enums/verification-type';

const VERIFIED = 'Verified';
const PENDING = 'Pending';
const IN_PROGRESS = 'In progress';
const CANCELLED = 'Cancelled';
const ADDRESS = 'Address';
const PASSPORT = 'Passport';
const MONEY_SOURCE = 'Money source';

export interface IVerification {
  id: number;
  status: VerificationStatus;
  type: VerificationType;
  files: IVerificationFile[];
  createdAt: string;
  updatedAt: string;
}

export class Verification {
  public id: number;
  public status: VerificationStatus;
  public type: VerificationType;
  public files: VerificationFile[];
  public createdAt: string;
  public updatedAt: string;

  constructor(data: IVerification) {
    this.id = data.id;
    this.status = data.status;
    this.type = data.type;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    if (data.files) {
      this.files = data.files.map((file: IVerificationFile) => new VerificationFile(file));
    }
  }

  public getTypeName(): string {
    switch (this.type.toLowerCase()) {
      case VerificationType.address: {
        return ADDRESS;
      }
      case VerificationType.passport: {
        return PASSPORT;
      }
      case VerificationType.moneySource: {
        return MONEY_SOURCE;
      }
      default: {
        return this.type;
      }
    }
  }

  public getStatusName(): string {
    switch (this.status.toLowerCase()) {
      case VerificationStatus.pending: {
        return PENDING;
      }
      case VerificationStatus.progress: {
        return IN_PROGRESS;
      }
      case VerificationStatus.cancelled: {
        return CANCELLED;
      }
      case VerificationStatus.approved: {
        return VERIFIED;
      }
      default: {
        return this.status;
      }
    }
  }

  public getStatusType(): StatusType {
    switch (this.status.toLowerCase()) {
      case VerificationStatus.pending:
      case VerificationStatus.progress: {
        return StatusType.info;
      }
      case VerificationStatus.cancelled: {
        return StatusType.error;
      }
      case VerificationStatus.approved: {
        return StatusType.success;
      }
      default: {
        return StatusType.info;
      }
    }
  }

  public static getSelectOptions(): SelectOption[] {
    return [
      { id: VerificationStatus.approved, value: VERIFIED },
      { id: VerificationStatus.cancelled, value: CANCELLED },
      { id: VerificationStatus.pending, value: PENDING },
      { id: VerificationStatus.progress, value: IN_PROGRESS },
    ];
  }
}
