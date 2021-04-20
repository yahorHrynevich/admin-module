import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationListComponent } from '@modules/admin/pages/verification/verification-list/verification-list.component';

const routes: Routes = [
  {
    path: '', component: VerificationListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationListRoutingModule {

}
