import { Component } from '@angular/core';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.scss'],
})
export class LoginDetailsComponent {
  public date: string = new Date().toString();
  public ip: string = '213.149.568.546';
}
