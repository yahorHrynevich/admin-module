import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StaffComponent } from './staff.component';
import { StaffRoutingModule } from '@modules/admin/pages/users/staff/staff-routing.module';


@NgModule({
  declarations: [
    StaffComponent,
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
  ],
  exports: [],
  providers: [],
})
export class StaffModule {
}
