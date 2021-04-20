import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponentsModule } from '@modules/admin/components/admin-components.module';
import { MerchantDetailsComponent } from './merchant-details.component';
import { MerchantDetailsRoutingModule } from './merchant-details-routing.module';


@NgModule({
  declarations: [
    MerchantDetailsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    TranslateModule,
    AdminComponentsModule,
    PipesModule,
    ReactiveFormsModule,
    MerchantDetailsRoutingModule,
  ],
  exports: [],
  providers: [],
})
export class MerchantDetailsModule {
}
