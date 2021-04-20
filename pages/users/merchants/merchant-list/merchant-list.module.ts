import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { AdminComponentsModule } from '@modules/admin/components/admin-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MerchantListComponent } from './merchant-list.component';
import { MerchantListRoutingModule } from './merchant-list-routing.module';


@NgModule({
  declarations: [
    MerchantListComponent,
  ],
  imports: [
    CommonModule,
    MerchantListRoutingModule,
    ComponentsModule,
    AdminComponentsModule,
    TranslateModule,
    PipesModule,
    NgxPaginationModule,
  ],
  exports: [],
  providers: [],
})
export class MerchantListModule {
}
