import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';
import { AlertService, UserService } from '../../_services';
import { RootComponent } from '../../_shared/components/root/root.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent extends RootComponent {

  public sidebarMinimized = false;
  public navItems = navItems;
  admin: any

  constructor(private _US: UserService, public _AS: AlertService, private router: Router) {
    super(_AS);
    this.admin = JSON.parse(localStorage.getItem("admin"));
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this._US.logout().subscribe(
      (data: any) => {
        if (data.meta.status) {
          localStorage.clear();
          this._US.updateAdminAuth(false, null);
          this.router.navigate(['/login']);
          this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
        }
        else {
          this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    )
  }

}
