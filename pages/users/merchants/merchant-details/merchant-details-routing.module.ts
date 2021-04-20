import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantDetailsComponent } from './merchant-details.component';


const routes: Routes = [
  {
    path: '', component: MerchantDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantDetailsRoutingModule {

}
