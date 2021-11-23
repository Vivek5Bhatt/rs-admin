import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-send-notification-list',
  templateUrl: './send-notification-list.component.html',
  styleUrls: ['./send-notification-list.component.css']
})
export class SendNotificationListComponent implements OnInit {

  userNotificationData: any;
  constructor(private _US: UserService) { }

  ngOnInit(): void {
    this.getUserNotification();
  }
  getUserNotification() {
    this._US.getUserNotifications().subscribe((data: any) => {
      if (data.meta.status) {
        this.userNotificationData = data.data;
      }
    })
  }

}
