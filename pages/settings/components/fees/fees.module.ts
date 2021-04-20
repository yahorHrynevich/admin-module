import { FeesComponent } from '@modules/admin/pages/settings/components/fees/fees.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeesRoutingModule } from '@modules/admin/pages/settings/components/fees/fees-routing.module.component';
import { FeeComponent } from '@modules/admin/pages/settings/components/fees/components/fee/fee.component';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '@components/components.module';

@NgModule({
  declarations: [
    FeesComponent,
    FeeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeesRoutingModule,
    TranslateModule,
    ComponentsModule,
  ],
  exports: [],
  providers: [],
})
export class FeesModule {
}
