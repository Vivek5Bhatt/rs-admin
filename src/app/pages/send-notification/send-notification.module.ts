import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms"
import { SendNotificationRoutingModule } from './send-notification-routing.module';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SendNotificationListComponent } from './send-notification-list/send-notification-list.component';

@NgModule({
  declarations: [SendNotificationComponent, SendNotificationListComponent],
  imports: [
    CommonModule,
    SendNotificationRoutingModule,
    ReactiveFormsModule,NgSelectModule
  ]
})
export class SendNotificationModule { }
