import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { VendorService } from '../../vendor/vendor.service';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent extends RootComponent implements OnInit {
  sendNotificationFormGroup: FormGroup;
  vendorData: any
  constructor(private _FB: FormBuilder, private _VS: VendorService, public _AS: AlertService,private routes:Router) { super(_AS)}

  ngOnInit(): void {
    this.createFrom();
    this.getAllVendor();
  }

  createFrom() {
    this.sendNotificationFormGroup = this._FB.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      vendorId: [null, Validators.required]
    })
  }

  getAllVendor() {
    this._VS.getAllVendors().subscribe((data: any) => {
      if (data.meta.status) {
        this.vendorData = data.data;
      }
    })
  }
  sendNotification() {
    let userNameArray = []
    this.sendNotificationFormGroup.value.vendorId.map(el => {
      let findUser = this.vendorData.find(t => t.vendorId.toString() === el)
      if (findUser) {
        userNameArray.push({
          vendorId: el,
          shopName: findUser.shopName
        });
      }
    });
    let obj = {
      title: this.sendNotificationFormGroup.value.title,
      message: this.sendNotificationFormGroup.value.message,
      vendorId: userNameArray
    }
    this._VS.senNotification(obj).subscribe((data: any) => {
      if (data.meta.status) {
        this.routes.navigate(['/vendor-notification']);
        this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
      } else {
        this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
      }
    });
  }
  resetForm(){
    this.sendNotificationFormGroup.reset();
  }
}
