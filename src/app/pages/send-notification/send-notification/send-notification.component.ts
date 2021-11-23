import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { UserService } from '../../user/user.service'

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent extends RootComponent implements OnInit {

  sendNotificationFormGroup: FormGroup;
  usersData: any;
  constructor(
    private _FB: FormBuilder,
    private _US: UserService,
    public _AS: AlertService,
    private routes: Router
  ) {
    super(_AS)
  }

  ngOnInit(): void {
    this.createFrom();
    this.getAllUsers();
  }

  createFrom() {
    this.sendNotificationFormGroup = this._FB.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      userId: [null, Validators.required]
    })
  }

  sendNotification() {
    let userNameArray=[]
    this.sendNotificationFormGroup.value.userId.map(el=>{
      let findUser=this.usersData.find(t=>t.userId.toString()===el)
      if(findUser){
        userNameArray.push({
          userId:el,
          userName:findUser.fullName
        })
      }
    })
    let obj={
      title:this.sendNotificationFormGroup.value.title,
      message:this.sendNotificationFormGroup.value.message,
      userId:userNameArray
    }

    this._US.sendNotification(obj).subscribe((data: any) => {
      if (data.meta.status) {
        this.routes.navigate(['/user-notification']);
        this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
      } else {
        this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
      }
    })
  }

  getAllUsers() {
    this._US.getAllUsers().subscribe((data: any) => {
      if (data.meta.status) {
        this.usersData = data.data;
      }
    })
  }

  resetForm() {
    this.sendNotificationFormGroup.reset();
  }
}
