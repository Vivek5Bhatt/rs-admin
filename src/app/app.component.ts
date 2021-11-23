import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './_services';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet><app-alert></app-alert>'
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private _US: UserService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin && admin.adminId && admin.authKey) {
      this._US.updateAdminAuth(true, admin)
    }
  }
}
