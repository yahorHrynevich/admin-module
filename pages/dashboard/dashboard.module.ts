import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from '@modules/admin/pages/dashboard/dashboard.component';
import { DashboardRoutingModule } from '@modules/admin/pages/dashboard/dashboard-routing.module';
import { ComponentsModule } from '@components/components.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    TranslateModule,
  ],
  exports: [],
  providers: [],
})
export class DashboardModule {
}
