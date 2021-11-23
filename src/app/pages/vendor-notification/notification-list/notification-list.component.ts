import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../vendor/vendor.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  vemdorNotificationData: any;
  constructor(private _VS: VendorService) { }

  ngOnInit(): void {
    this.getVendorNotifications();
  }

  getVendorNotifications() {
    this._VS.getVendorNotification().subscribe((data: any) => {
      if (data.meta.status) {
        this.vemdorNotificationData = data.data;
      }
    });
  }
}
