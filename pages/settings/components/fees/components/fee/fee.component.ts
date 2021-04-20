import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Fee } from '@modules/admin/models/fee';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { onlyNumber } from '@validators/only-numder.validator';
import { NotificationService } from '@services/notification.service';
import { SpinnerService } from '@services/spinner.service';
import { FeeService } from '@modules/admin/services/fee.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss'],
})
export class FeeComponent {
  public noItemsLabel: string = 'No Item';
  public fees: Fee[];
  public formArrayName: string = 'fees';
  public form: FormGroup;

  private operationNumber: number;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private feeService: FeeService,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService,
  ) {
    this.initForm();
    this.feeService.operationId$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.operationNumber = value;
        this.loadFees();
        this.getFees();
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadFees(): void {
    this.feeService.loadFees(this.operationNumber);
  }

  private getFees(): void {
    this.feeService.fees$.pipe(takeUntil(this.unsubscribe$)).subscribe((data: Fee[]) => {
      if (data) {
        this.fees = data;
        this.initForm();
        this.addFeeInForm();
      }
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fees: this.formBuilder.array([
        this.getFormControls(),
      ]),
    });
  }

  private getFormControls(): FormGroup {
    return this.formBuilder.group({
      minFeeControl: [null, [Validators.required, onlyNumber]],
      maxFeeControl: [null, [Validators.required, onlyNumber]],
      percentFeeControl: [null, [Validators.required, onlyNumber]],
      baseFeeControl: [null, [Validators.required, onlyNumber]],
      codeFeeControl: [null, [Validators.required]],
    });
  }

  private addFeeInForm(): void {
    const feesControls = this.fees.map((fee) => ({
      minFeeControl: fee.min,
      maxFeeControl: fee.max,
      percentFeeControl: fee.percent,
      baseFeeControl: fee.base,
      codeFeeControl: fee.currencyCode,
    }));

    const control = this.form.controls[this.formArrayName] as FormArray;
    for (let i = 1; i < feesControls.length; i++) {
      control.push(this.getFormControls());
    }

    this.form.patchValue({ fees: feesControls });
  }

  public save(): void {
    if (this.form.valid) {
      const fees: Fee[] = this.form.value.fees.map((fee) => ({
        currencyCode: fee.codeFeeControl,
        base: fee.baseFeeControl,
        percent: fee.percentFeeControl,
        min: fee.minFeeControl,
        max: fee.maxFeeControl,
        delete: false,
      }));

      this.spinnerService.makeObservableWithSpinner(this.feeService.sendFee(this.operationNumber, fees))
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.notificationService.success('The fees amount has been changed');
        });
    }
  }
}
