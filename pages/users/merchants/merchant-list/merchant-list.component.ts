import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from '@models/pagination';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DropdownComponent } from '@components/dropdown/dropdown.component';
import { CurrencyService } from '@services/currency.service';
import { Observable, of } from 'rxjs';
import { SelectOption } from '@models/select-option';
import { Currency } from '@modules/admin/models/currency';

interface IUser {
  name: string;
  email: string;
  merchantId: string;
  code: string;
  currency: string;
  grossAmount: number;
  XMATKTransacted: number;
  auth: string;
  clientCount: number;
  key: string;
}

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss'],
})
export class MerchantListComponent implements OnInit {
  public users: IUser[];
  public form: FormGroup;
  public pagination: Pagination;
  public noItemsLabel: string = 'There are no users to display with current filter. Try changing filter parameters.';

  @ViewChild('dropdown', { static: false }) dropdown: DropdownComponent;

  constructor(
    private formBuilder: FormBuilder,
    private currencyService: CurrencyService,
  ) {
    this.initForms();
    this.initUsers();
    this.initCurrencies();
    this.pagination = {
      totalRecord: 7,
      totalPage: 1,
      offset: 1,
      limit: 10,
      pageNumber: 1,
    };
  }

  get resetTable$(): Observable<boolean> {
    return of(false);
  }

  public ngOnInit(): void {
    this.initForms();
  }

  public statuses: SelectOption[] = [];

  public currencies: SelectOption[];

  private initForms(): void {
    this.form = this.formBuilder.group({
      sort: [null],
    });
  }

  private initUsers(): void {
    this.users = [];
    // this is a stub
    // tslint:disable-next-line:no-magic-numbers
    for (let i = 0; i < 10; i++) {
      this.users.push({
        name: 'Cameron Simmmons',
        email: 'gregory_mckinney@gmail.com',
        merchantId: 'cb1e786b',
        code: 'Marinexcahge_',
        currency: 'EUR',
        grossAmount: 3248.0,
        XMATKTransacted: 0.0,
        auth: 'MBBYFIJDFDKGDVDFFKVMX',
        clientCount: 7,
        key: 'LBL',
      });
    }
  }

  private initCurrencies(): void {
    const currencies = this.currencyService.getCurrencies();
    this.currencies = currencies.map((currency: Currency) => new SelectOption({
      id: currency.code,
      value: currency.code,
    }));
  }
}
