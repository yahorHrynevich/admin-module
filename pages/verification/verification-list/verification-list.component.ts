import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pagination } from '@models/pagination';
import { DropdownComponent } from '@components/dropdown/dropdown.component';
import { SelectOption } from '@models/select-option';
import { Subject } from 'rxjs';
import { setToFirstPageOnChangeFilters } from '@logic/set-first-page';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { Constants } from '@constants/constants';
import { ITransactionsHistoryRequest } from '@interfaces/transactions-history-request.interface';
import { IHttpResponse } from '@interfaces/http-response.interface';
import { AccountDetails } from '@modules/admin/models/account-details';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SpinnerService } from '@services/spinner.service';
import { VerificationListService } from '@modules/admin/pages/verification/verification-list/verification-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './verification-list.component.html',
  styleUrls: ['./verification-list.component.scss'],
})
export class VerificationListComponent implements OnInit, AfterViewInit, OnDestroy {
  public users: AccountDetails[];
  public form: FormGroup;
  public pagination: Pagination;
  public filterParams: Params;
  public reload: boolean = false;
  public noItemsLabel: string = 'There are no users to display with current filter. Try changing filter parameters.';
  public resetHistory$: Subject<boolean>;
  public showResetButton: boolean = false;

  public statuses: SelectOption[] = [
    { id: 'pending', value: 'Pending' },
    { id: 'active', value: 'Active' },
    { id: 'blocked', value: 'Blocked' },
    { id: 'dormant', value: 'Dormant' },
  ];

  private unsubscribe$: Subject<void> = new Subject<void>();

  @ViewChild('dropdown', { static: false }) dropdown: DropdownComponent;

  constructor(
    private formBuilder: FormBuilder,
    private verificationListService: VerificationListService,
    private spinnerService: SpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.initForm();
    this.resetHistory$ = new Subject<boolean>();
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value: Params) => this.showResetButton = !!(value && Object.keys(value).length));
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public ngAfterViewInit(): void {
    this.subscribeToFormValueChanges();
    this.updateForm();
  }

  public updateFormWithFilter(): void {
    this.form.patchValue(this.filterParams);
  }

  public updateFormWithoutFilter(): void {
    this.form.patchValue({
      sort: '-lastLoginAt',
    });
  }

  public resetFilters(): void {
    this.resetHistory$.next(true);
    this.router.navigate([]);
    this.reload = false;
    this.updateFormWithoutFilter();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      sort: [null],
    });
  }

  private updateForm(): void {
    if (this.filterParams && Object.keys(this.filterParams).length) {
      this.updateFormWithFilter();
    } else {
      this.updateFormWithoutFilter();
    }
  }

  private subscribeToFormValueChanges(): void {
    this.form.valueChanges
      .pipe(
        setToFirstPageOnChangeFilters(this.form),
        debounceTime(Constants.DEFAULT_DEBOUNCE_TIME),
        map(value => this.createLoadClientsRequest(value)),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((form: ITransactionsHistoryRequest) => {
        this.applyFilter(form);
      });
  }

  private createLoadClientsRequest(form: any): ITransactionsHistoryRequest {
    Object.keys(form).forEach((key: string) =>
      form[key] = Array.isArray(form[key]) ? (form[key] as SelectOption[]).map(value => value ? value.id : '').toString() : form[key]);
    return form;
  }

  private applyFilter(form: ITransactionsHistoryRequest): void {
    this.applyFilterToResults(form);
    if (this.reload) {
      this.applyFilterToRoute(form);
    }

    this.reload = true;
  }

  private applyFilterToResults(form: ITransactionsHistoryRequest): void {
    this.spinnerService.makeObservableWithSpinner(this.verificationListService.getVerifications(form))
      .subscribe((response: IHttpResponse<AccountDetails[]>) => {
        this.updateData(response);
      }, () => {
        this.resetTable();
      });
  }

  private applyFilterToRoute(form: ITransactionsHistoryRequest): void {
    Object.keys(form).forEach(key => !form[key] && delete form[key]);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: form,
    });
  }

  private updateData(resp: IHttpResponse<AccountDetails[]>): void {
    this.users = resp.data;
    this.pagination = resp.pagination;
  }

  private resetTable(): void {
    this.users = [];
    this.pagination = undefined;
  }
}
