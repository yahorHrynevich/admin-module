import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownComponent } from '@components/dropdown/dropdown.component';
import { SelectOption } from '@models/select-option';
import { Pagination } from '@models/pagination';
import { Observable, of } from 'rxjs';

interface IUsers {
  ip: string;
  userId: string;
  name: string;
  email: string;
  date: Date;
  status: {};
}

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  public users: IUsers[];
  public form: FormGroup;
  public pagination: Pagination;
  public noItemsLabel: string = 'There are no users to display with current filter. Try changing filter parameters.';

  @ViewChild('dropdown', { static: false }) dropdown: DropdownComponent;

  constructor(private formBuilder: FormBuilder) {
    this.initForms();
    this.pagination = {
      totalRecord: 7,
      totalPage: 1,
      offset: 1,
      limit: 10,
      pageNumber: 1,
    };
    this.users = [
      {
        ip: '95.174.98.109',
        userId: '1',
        name: 'Gregory Mckinney',
        email: 'aaa@dekj.com',
        date: new Date(),
        status: { name: 'success', type: 'success' },
      },
      {
        ip: '95.174.98.109',
        userId: '1232',
        name: 'Gregory Mckinney',
        email: 'aaa@dekj.com',
        date: new Date(),
        status: { name: 'success', type: 'success' },
      },
      {
        ip: '95.174.98.109', userId: '345521', name: 'Gregory Mckinney', email: 'asdfg@dekj.com',
        date: new Date(), status: { name: 'success', type: 'success' },
      },
      {
        ip: '95.174.98.109',
        userId: '4551211',
        name: 'Gregory Mckinney',
        email: 'aaa@dekj.com',
        date: new Date(),
        status: { name: 'success', type: 'success' },
      },
      {
        ip: '95.174.98.109', userId: '345212', name: 'Gregory Mckinney', email: 'asdfvs@dekj.com',
        date: new Date(), status: { name: 'success', type: 'success' },
      },
      {
        ip: '95.174.98.109',
        userId: '1232',
        name: 'Gregory Mckinney',
        email: 'aaa@dekj.com',
        date: new Date(),
        status: { name: 'success', type: 'success' },
      },
      {
        ip: '95.174.98.109',
        userId: '223231',
        name: 'Gregory Mckinney',
        email: 'aaa@dekj.com',
        date: new Date(),
        status: { name: 'success', type: 'success' },
      },
    ];
  }

  get resetTableObservable$(): Observable<boolean> {
    return of(false);
  }

  public ngOnInit(): void {
    this.initForms();
  }

  public names: SelectOption[] = [
    { id: 'filter_1', value: 'filter_1' },
    { id: 'filter_2', value: 'filter_2' },
  ];

  public statuses: SelectOption[];

  private initForms(): void {
    this.form = this.formBuilder.group({
      sort: [null],
    });
  }
}
