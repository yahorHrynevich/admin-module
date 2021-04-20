import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientDetailsService } from '@modules/admin/services/client-details.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AccountDetails } from '@modules/admin/models/account-details';
import { NotificationService } from '@services/notification.service';
import { ModalNavigationService } from '@services/modal-navigation.service';
import { SpinnerService } from '@services/spinner.service';
import * as moment from 'moment';
import { LocaleConfig } from 'ngx-daterangepicker-material';
import { DateHelper } from '@logic/date.helper';

const MAX_COUNTRY_CODE_LENGTH = 2;
const MAX_CITY_NAME_LENGTH = 45;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  public form: FormGroup;
  public locale: LocaleConfig = { format: 'YYYY-MM-DD' };

  private userDetails: AccountDetails;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
    private clientDetailsService: ClientDetailsService,
    private notificationService: NotificationService,
    private modalNavigationService: ModalNavigationService,
    private spinnerService: SpinnerService,
  ) {
  }

  public ngOnInit(): void {
    if (this.clientDetailsService.getAccountDetailsValue()) {
      this.userDetails = this.clientDetailsService.getAccountDetailsValue();
    } else {
      this.modalNavigationService.closeModal();
    }

    this.initForm();
  }

  public save(): void {
    if (this.form.valid) {
      this.setClientDetails(this.userDetails.uid);
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      firstName: [this.userDetails.firstName, [Validators.required]],
      lastName: [this.userDetails.lastName, [Validators.required]],
      paAddress: [this.userDetails.paAddress, [Validators.required]],
      paCity: [this.userDetails.paCity, [Validators.required, Validators.maxLength(MAX_CITY_NAME_LENGTH)]],
      paCountryIso2: [this.userDetails.paCountryIso2, [Validators.required, Validators.maxLength(MAX_COUNTRY_CODE_LENGTH)]],
    });

    this.setDateOfBirth();
  }

  private setDateOfBirth(): void {
    if(this.userDetails.dateOfBirth) {
      this.form.addControl('dateOfBirth', new FormControl({
        startDate: moment(DateHelper.getFullBirthdayDateFormat(this.userDetails.dateOfBirth)),
        endDate:  moment(DateHelper.getFullBirthdayDateFormat(this.userDetails.dateOfBirth)),
      }));
    } else {
      this.form.addControl('dateOfBirth', new FormControl(null));
    }
  }

  private setClientDetails(userUid: string): void {
    const data: AccountDetails = this.form.value;

    if (this.form.value.dateOfBirth.startDate) {
      data.dateOfBirth = DateHelper.getFullBirthdayDateFormat(this.form.value.dateOfBirth.startDate._d);
    } else {
      delete data.dateOfBirth;
    }

    this.spinnerService.makeObservableWithSpinner(this.clientDetailsService.updateClientDetails(userUid, data))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.notificationService.success('User has been changed');
        this.clientDetailsService.loadAccountDetails(userUid);
        this.modalNavigationService.closeModal();
      });
  }
}
