import { Component } from '@angular/core';
import { StatusType } from '@enums/status-type';

@Component({
  selector: 'app-client-verification',
  templateUrl: './client-verification.component.html',
  styleUrls: ['./client-verification.component.scss'],
})
export class ClientVerificationComponent {
  public statuses = StatusType;
}
