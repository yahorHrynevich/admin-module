import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VerificationDetailsRoutingModule } from '@modules/admin/pages/verification/verification-details/verification-details-routing.module';
import { VerificationDetailsComponent } from '@modules/admin/pages/verification/verification-details/verification-details.component';
import { ClientVerificationComponent } from './components/client-verification/client-verification.component';
import { ClientDocumentsComponent } from './components/client-documents/client-documents.component';
import { ComponentsModule } from '@components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponentsModule } from '@modules/admin/components/admin-components.module';
import { ClientDetailsComponent } from '@modules/admin/pages/verification/verification-details/components/client-details/client-details.component';

@NgModule({
  declarations: [
    VerificationDetailsComponent,
    ClientVerificationComponent,
    ClientDocumentsComponent,
    ClientDetailsComponent,
  ],
  imports: [
    CommonModule,
    VerificationDetailsRoutingModule,
    ComponentsModule,
    TranslateModule,
    AdminComponentsModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [],
})
export class VerificationDetailsModule {
}
