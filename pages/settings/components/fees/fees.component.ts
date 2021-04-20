import { Component } from '@angular/core';
import { ModalNavigationService } from '@services/modal-navigation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpinnerService } from '@services/spinner.service';
import { TransferFee } from '@modules/admin/models/transfer-fee';
import { FeeService } from '@modules/admin/services/fee.service';

enum Operations {
  SEND = 'SEND',
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  BUY = 'BUY',
  SELL = 'SELL',
  CONVERT = 'CONVERT',
}

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss'],
})
export class FeesComponent {
  public operationName: string = Operations.BUY;
  public operations = Operations;

  private transferFee: TransferFee[];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private feeService: FeeService,
    private modalNavigationService: ModalNavigationService,
    private spinnerService: SpinnerService,
  ) {
    this.spinnerService.makeObservableWithSpinner(this.feeService.loadFeeOperations())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: TransferFee[]) => {
        this.transferFee = data;
        this.updateCurrentOperation();
      });
  }

  public setId(name: string): void {
    this.operationName = name;
    this.updateCurrentOperation();
  }

  public openDeleteFeeModal(): void {
    this.modalNavigationService.navigate('delete-fee');
  }

  public openAddFeeModal(): void {
    this.modalNavigationService.navigate('add-fee');
  }

  private updateCurrentOperation(): void {
    const currentOperation = this.transferFee.find((item:TransferFee) => item.requestSubject === this.operationName);
    this.feeService.operationId$.next(currentOperation.id);
  }
}
