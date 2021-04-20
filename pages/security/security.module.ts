import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SecurityComponent } from '@modules/admin/pages/security/security.component';
import { SecurityRoutingModule } from '@modules/admin/pages/security/security-routing.module';
import { ComponentsModule } from '@components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponentsModule } from '@modules/admin/components/admin-components.module';


@NgModule({
  declarations: [
    SecurityComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ComponentsModule,
    TranslateModule,
    PipesModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AdminComponentsModule,
  ],
  exports: [],
  providers: [],
})
export class SecurityModule {
}
