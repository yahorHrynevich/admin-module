import { RouterModule, Routes } from '@angular/router';
import { FeesComponent } from '@modules/admin/pages/settings/components/fees/fees.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', component: FeesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeesRoutingModule {
}
