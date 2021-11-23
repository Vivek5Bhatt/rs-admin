import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendNotificationListComponent } from './send-notification-list/send-notification-list.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';


const routes: Routes = [ {
  path: '',
  data: { title: 'Send Notification' },
  children: [
    { path: '', component: SendNotificationListComponent, data: { title: 'Send Notification List' } },
    { path: 'add', component: SendNotificationComponent, data: { title: 'Send Notification Add' } },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SendNotificationRoutingModule { }
