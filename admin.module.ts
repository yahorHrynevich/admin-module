import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AdminRoutingModule } from '@modules/admin/admin-routing.module';
import { AdminComponent } from '@modules/admin/admin.component';
import { ComponentsModule } from '@components/components.module';
import { AdminComponentsModule } from '@modules/admin/components/admin-components.module';
import { VerificationService } from '@modules/admin/services/verification.service';
import { CurrencyService } from '@services/currency.service';
import { ClientDetailsService } from '@modules/admin/services/client-details.service';
import { FeeService } from '@modules/admin/services/fee.service';


@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslateModule.forChild(),
    ComponentsModule,
    AdminComponentsModule,
  ],
  exports: [],
  providers: [],
})
export class AdminModule {
  static forRoot(): ModuleWithProviders {
    return ({
      ngModule: AdminComponentsModule,
      providers: [
        VerificationService,
        CurrencyService,
        ClientDetailsService,
        FeeService,
      ],
    });
  }
}
