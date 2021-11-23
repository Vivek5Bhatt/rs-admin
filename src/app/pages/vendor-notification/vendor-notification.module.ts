import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorNotificationRoutingModule } from './vendor-notification-routing.module';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [SendNotificationComponent, NotificationListComponent],
  imports: [
    CommonModule,
    VendorNotificationRoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class VendorNotificationModule { }
