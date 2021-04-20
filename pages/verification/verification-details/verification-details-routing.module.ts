import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationDetailsComponent } from '@modules/admin/pages/verification/verification-details/verification-details.component';

const routes: Routes = [
  {
    path: '', component: VerificationDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationDetailsRoutingModule {

}
