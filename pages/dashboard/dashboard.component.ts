import { Component } from '@angular/core';
import { StatusType } from '@enums/status-type';
import { ICard } from '@modules/admin/interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public cards: ICard[];
  public cardsWithNotification: ICard[];

  constructor() {
    this.cards = [
      {
        title: 'Registrations trend',
        amount: '52,343',
      },
      {
        title: 'Total transactions',
        amount: '5,896,156',
      },
      {
        title: 'Total clients',
        amount: '532',
        description: 'Clients',
      },
    ];
    this.cardsWithNotification = [
      {
        title: 'Expecting verification',
        amount: '8',
        description: 'Clients',
        status: {
          text: 'Waiting',
          type: StatusType.warning,
        },
      },
      {
        title: 'Withdrawal',
        amount: '16',
        description: 'amounts',
        status: {
          text: 'Waiting',
          type: StatusType.warning,
        },
      },
      {
        title: 'Messages',
        amount: '10',
        status: {
          text: 'Waiting',
          type: StatusType.warning,
        },
      },
    ];
  }
}
