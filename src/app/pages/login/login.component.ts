import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../../_services';
import { RootComponent } from '../../_shared/components/root/root.component';

interface admin {
  name: string;
  adminId: string;
  authKey: string;
  profilePic: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent extends RootComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(
    private _US: UserService,
    private _FB: FormBuilder,
    private router: Router,
    public _AS: AlertService
  ) {
    super(_AS)
    this.loginFormGroup = this._FB.group({
      empEmailID: ['', [Validators.required, Validators.email]],
      empPassword: ['', [Validators.required, Validators.min(6)]]
    })
  }

  ngOnInit(): void {

  }

  login() {
    if (this.loginFormGroup.valid) {
      this._US.login(this.loginFormGroup.value).subscribe(
        (data: any) => {
          if (data.meta.status) {
            const user: admin = { name: data.data.empName, adminId: data.data.empId, profilePic: data.data.profilePic, authKey: data.token };
            this._US.updateAdminAuth(true, user);
            localStorage.setItem('admin', JSON.stringify(user));
            this.router.navigate(['/']);
            this.alertMessage({ type: 'success', title: 'Success', value: data.meta.msg });
          }
          else {
            this.alertMessage({ type: 'danger', title: 'Error Occured', value: data.meta.msg });
          }
        }
      )
    }
  }

}
