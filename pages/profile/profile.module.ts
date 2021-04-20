import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from '@modules/admin/pages/profile/profile-routing.module';
import { ComponentsModule } from '@components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponentsModule } from '@modules/admin/components/admin-components.module';
import { ProfileComponent } from '@modules/admin/pages/profile/profile.component';
import { PersonalInformationFormComponent } from './personal-information-form/personal-information-form.component';
import { LoginDetailsComponent } from './login-details/login-details.component';


@NgModule({
  declarations: [
    ProfileComponent,
    PersonalInformationFormComponent,
    LoginDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
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
export class ProfileModule {
}
