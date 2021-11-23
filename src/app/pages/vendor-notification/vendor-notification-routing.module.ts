import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationListComponent } from './notification-list/notification-list.component';
import {SendNotificationComponent} from './send-notification/send-notification.component'

const routes: Routes = [ {
  path: '',
  data: { title: 'Send Vendor Notification' },
  children: [
    { path: '', component: NotificationListComponent, data: { title: 'Notification List' } },
    { path: 'add', component: SendNotificationComponent, data: { title: 'Notification Add' } },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VendorNotificationRoutingModule { }
