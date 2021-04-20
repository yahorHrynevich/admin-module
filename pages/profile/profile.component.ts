import { Component } from '@angular/core';
import { AccountDetails } from '@modules/admin/models/account-details';
import { Observable } from 'rxjs';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public accountDetails$: Observable<AccountDetails>;

  constructor(
    private userService: UserService,
  ) {
  }

  public ngOnInit(): void {
    this.userService.updateAccountDetails();
    this.accountDetails$ = this.userService.accountDetails$;
  }
}
