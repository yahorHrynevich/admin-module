import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '@pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from '@components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@modules/admin/components/sidebar/sidebar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewMerchantComponent } from './new-merchant/new-merchant.component';
import { ModalsComponentsModule } from '@modules/modals/components/modals-components.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AddRemoveFeeComponent } from './add-remove-fee/add-remove-fee.component';


@NgModule({
  declarations: [
    SidebarComponent,
    NewMerchantComponent,
    EditUserComponent,
    AddRemoveFeeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    ChartsModule,
    PipesModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    RouterModule,
    NgxPaginationModule,
    ModalsComponentsModule,
    NgxDaterangepickerMd,
  ],
  exports: [
    SidebarComponent,
    NewMerchantComponent,
    EditUserComponent,
    AddRemoveFeeComponent,
  ],
  providers: [],
})
export class AdminComponentsModule {
}
