import { Component, Input } from '@angular/core';
import { AccountDetails } from '@modules/admin/models/account-details';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent {
  @Input()
  public userDetails: AccountDetails;
}
