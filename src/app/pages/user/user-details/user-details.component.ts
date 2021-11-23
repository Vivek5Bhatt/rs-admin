import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from "../user.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userDetails: any;

  constructor(private routes: ActivatedRoute, private _US: UserService) { }

  ngOnInit(): void {
    this.routes.params.subscribe(
      data => {
        if (data.userId) {
          this.getUserDetails(data.userId);
        }
      }
    )
  }

  getUserDetails(userId: string) {
    this._US.getUserDetails(userId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.userDetails = data.data;
        }
      }
    )
  }

}
