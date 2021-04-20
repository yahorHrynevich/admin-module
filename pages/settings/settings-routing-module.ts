import { Route, RouterModule } from '@angular/router';
import { SettingsComponent } from '@modules/admin/pages/settings/settings.component';
import { NgModule } from '@angular/core';
import { CurrenciesComponent } from '@modules/admin/pages/settings/components/currencies/currencies.component';
import { MarginFeeComponent } from '@modules/admin/pages/settings/components/margin-fee/margin-fee.component';

const routes: Route[] = [
  {
    path: '', component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'currencies', pathMatch: 'full' },
      {
        path: 'currencies',
        component: CurrenciesComponent,
      },
      {
        path: 'fees',
        loadChildren: () => import('./components/fees/fees.module').then(module => module.FeesModule),
      },
      {
        path: 'margin-fee',
        component: MarginFeeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {

}
