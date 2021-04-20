import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pagination } from '@models/pagination';

interface INotifications {
  type: string;
  name: string;
  country: string;
  email: string;
  time: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  public notifications: INotifications[];
  public form: FormGroup;
  public pagination: Pagination;

  constructor(private formBuilder: FormBuilder) {
    this.initNotifications();
    this.initForm();
    this.pagination = {
      totalRecord: 7,
      totalPage: 1,
      offset: 1,
      limit: 10,
      pageNumber: 1,
    };
  }

  private initForm():void {
    this.form = this.formBuilder.group({
      sort: [null],
    });
  }

  private initNotifications(): void {
    this.notifications = [
      {
        type: 'New user registered',
        name: 'Kathryn Murphy',
        country: 'United States',
        email: 'jeff.anderson@example.com',
        time: new Date().toString(),
      },
      {
        type: 'New user registered',
        name: 'Kathryn Murphy',
        country: 'United States',
        email: 'jeff.anderson@example.com',
        time: new Date().toString(),
      },
      {
        type: 'New user registered',
        name: 'Kathryn Murphy',
        country: 'United States',
        email: 'jeff.anderson@example.com',
        time: new Date().toString(),
      },
      {
        type: 'New user registered',
        name: 'Kathryn Murphy',
        country: 'United States',
        email: 'jeff.anderson@example.com',
        time: new Date().toString(),
      },
      {
        type: 'New user registered',
        name: 'Kathryn Murphy',
        country: 'United States',
        email: 'jeff.anderson@example.com',
        time: new Date().toString(),
      },
    ];
  }
}
