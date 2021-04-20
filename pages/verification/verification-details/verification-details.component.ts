import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountDetails } from '@modules/admin/models/account-details';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificationService } from '@modules/admin/services/verification.service';
import { ModalNavigationService } from '@services/modal-navigation.service';
import { Verification } from '@modules/admin/models/verification';
import { takeUntil } from 'rxjs/operators';
import { ClientDetailsService } from '@modules/admin/services/client-details.service';

@Component({
  selector: 'app-verification-details',
  templateUrl: './verification-details.component.html',
  styleUrls: ['./verification-details.component.scss'],
})
export class VerificationDetailsComponent implements OnDestroy {
  public userDetails: AccountDetails;
  public userVerifications: Verification[];
  public form: FormGroup;
  public userUid: string;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private verificationService: VerificationService,
    private modalNavigationService: ModalNavigationService,
    private clientDetailsService: ClientDetailsService,
    private router: Router,
  ) {
    this.subscribeToUserInfo();
    this.userUid = this.activatedRoute.snapshot.paramMap.get('id');
    this.clientDetailsService.loadAccountDetails(this.userUid);
  }

  public ngOnDestroy(): void {
    this.clientDetailsService.clearUserClientInfo();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public openPage(verification: Verification): void {
    this.verificationService.verification = verification;
    this.modalNavigationService.navigate('document-verification');
  }

  public goBack(): void {
    this.router.navigate(['admin', 'verification']);
  }

  public subscribeToUserInfo(): void {
    this.clientDetailsService.accountDetails$.pipe(takeUntil(this.unsubscribe$)).subscribe((accountDetails: AccountDetails) => {
      this.userDetails = accountDetails;
    });

    this.clientDetailsService.verifications$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((verifications: Verification[]) => this.userVerifications = verifications);
  }
}
