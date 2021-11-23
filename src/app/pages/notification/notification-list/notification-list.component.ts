import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notifications: any = [];

  constructor(private _NS: NotificationService) { }

  ngOnInit(): void {
    this.getAllNotification();
  }

  getAllNotification() {
    this._NS.getAllNotification().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.notifications = data.data;
        }
      }
    )
  }

}
