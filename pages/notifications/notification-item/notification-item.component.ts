import { Component, Input } from '@angular/core';

interface INotification {
  type: string;
  name: string;
  country: string;
  email: string;
  time: string;
}


@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent {
  @Input()
  public notification: INotification;
}
