import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-merchant',
  templateUrl: './new-merchant.component.html',
  styleUrls: ['./new-merchant.component.scss'],
})
export class NewMerchantComponent {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.initForm();
  }

  public submit(): void {
    if (this.form.valid) {
      // TODO send request
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      companyName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      country: [null, [Validators.required]],
      key: [null, [Validators.required]],
      auth: [null, [Validators.required]],
      sendInvitation: [null],
      sendVerificationDocuments: [null],
    });
  }
}
