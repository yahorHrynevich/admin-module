import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from '@modules/admin/pages/settings/settings-routing-module';
import { CurrenciesComponent } from '@modules/admin/pages/settings/components/currencies/currencies.component';
import { SettingsComponent } from '@modules/admin/pages/settings/settings.component';
import { ComponentsModule } from '@components/components.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MarginFeeComponent } from './components/margin-fee/margin-fee.component';

@NgModule({
  declarations: [
    CurrenciesComponent,
    SettingsComponent,
    MarginFeeComponent,
  ],
  imports: [
    SettingsRoutingModule,
    ComponentsModule,
    CommonModule,
    TranslateModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [],
})
export class SettingsModule {

}
