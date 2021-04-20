import { Component, Input } from '@angular/core';
import { Verification } from '@modules/admin/models/verification';
import { VerificationService } from '@modules/admin/services/verification.service';
import { ModalNavigationService } from '@services/modal-navigation.service';

@Component({
  selector: 'app-client-documents',
  templateUrl: './client-documents.component.html',
  styleUrls: ['./client-documents.component.scss'],
})
export class ClientDocumentsComponent {
  @Input() public verifications: Verification[];

  constructor(
    private verificationService: VerificationService,
    private modalNavigationService: ModalNavigationService,
  ) {
  }

  public openPage(verification: Verification): void {
    this.verificationService.verification = verification;
    this.modalNavigationService.navigate('document-verification');
  }
}
