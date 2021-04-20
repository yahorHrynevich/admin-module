import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VerificationListRoutingModule } from '@modules/admin/pages/verification/verification-list/verification-list-routing.module';
import { VerificationListComponent } from '@modules/admin/pages/verification/verification-list/verification-list.component';
import { ComponentsModule } from '@components/components.module';
import { AdminComponentsModule } from '@modules/admin/components/admin-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { VerificationListService } from '@modules/admin/pages/verification/verification-list/verification-list.service';


@NgModule({
  declarations: [
    VerificationListComponent,
  ],
  imports: [
    CommonModule,
    VerificationListRoutingModule,
    ComponentsModule,
    AdminComponentsModule,
    TranslateModule,
    PipesModule,
    NgxPaginationModule,
  ],
  exports: [],
  providers: [
    VerificationListService,
  ],
})
export class VerificationListModule {
}
