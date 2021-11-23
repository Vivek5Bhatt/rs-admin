import { AlertService } from './../../../_services/alert.service';
import { RootComponent } from './../../../_shared/components/root/root.component';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends RootComponent implements OnInit {

  users: any = [];

  constructor(private _US: UserService,public _AS:AlertService) { 
    super(_AS);
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this._US.getAllUsers().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.users = data.data;
        }
      }
    )
  }

  changeStatus(eve, userId: string) {
    let obj = {
      status: eve.target.checked ? 'active':'deactive',
      userId: userId
    }
    this._US.updateUserStatus(obj).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.getAllUsers();
          this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
        }
        else {
          this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    )
  }

}
