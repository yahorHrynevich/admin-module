import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponentsModule } from '@modules/admin/components/admin-components.module';
import { NotificationsComponent } from '@modules/admin/pages/notifications/notifications.component';
import { NotificationsRoutingModule } from '@modules/admin/pages/notifications/notifications-routing.module';
import { NotificationItemComponent } from './notification-item/notification-item.component';


@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationItemComponent,
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
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
export class NotificationsModule {
}
