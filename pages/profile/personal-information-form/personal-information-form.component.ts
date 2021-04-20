import { Component, Input, OnInit } from '@angular/core';
import { AccountDetails } from '@modules/admin/models/account-details';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectOption } from '@models/select-option';

@Component({
  selector: 'app-personal-information-form',
  templateUrl: './personal-information-form.component.html',
  styleUrls: ['./personal-information-form.component.scss'],
})
export class PersonalInformationFormComponent implements OnInit {
  @Input()
  public accountDetails: AccountDetails;

  public form: FormGroup;
  public languages: SelectOption[];

  // TODO remove this stub data
  public initLanguageId: string = '1';

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.initStubs();
    this.initForm();
    if (this.accountDetails) {
      this.updateForm(this.accountDetails);
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      firstName: [null],
      lastName: [null],
      systemLanguage: this.initLanguageId,
    });
  }

  private updateForm(accountDetails: AccountDetails): void {
    this.form.patchValue({
      firstName: accountDetails.firstName,
      lastName: accountDetails.lastName,
      systemLanguage: this.initLanguageId,
    });
  }

  private initStubs(): void {
    this.languages = [
      { id: '1', value: 'EN' },
    ];
  }
}
