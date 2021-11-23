import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { AdminProfileService } from '../admin-profile.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent extends RootComponent implements OnInit {

  profileFormGroup: FormGroup;

  constructor(private _FB: FormBuilder, private _APS: AdminProfileService, public _AS: AlertService) {
    super(_AS);
    this.profileFormGroup = this._FB.group({
      empName: [{ value: null, disabled: true }],
      empEmailID: [{ value: null, disabled: true }],
      gender: [{ value: null, disabled: true }],
      typeOfAdmin: [{ value: null, disabled: true }]
    })
  }

  ngOnInit(): void {
    this.getProfileDetails();
  }

  getProfileDetails() {
    this._APS.getProfileDetails().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.profileFormGroup.patchValue(data.data);
        }
      }, err => {
        this.alertMessage({ type: "danger", title: "Error Occured", value: err });
      }
    )
  }

}
