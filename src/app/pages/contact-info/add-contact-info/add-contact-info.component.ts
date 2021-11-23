import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { ContactInfoService } from '../contact-info.service';

@Component({
  selector: 'app-add-contact-info',
  templateUrl: './add-contact-info.component.html',
  styleUrls: ['./add-contact-info.component.css']
})
export class AddContactInfoComponent extends RootComponent implements OnInit {

  contactFormGroup: FormGroup
  isUpdate: boolean = false;
  constructor(private _FB: FormBuilder, 
    private routes: ActivatedRoute, 
    private _CS: ContactInfoService,
    private router: Router,
    public _AS:AlertService
    ) { 
      super(_AS)
    }

  ngOnInit(): void {
    this.formControl();
    this.routes.queryParams.subscribe(params => {
      if (params.isUpdate) {
        this.getBrandDetail()
      }
    })
  }

  formControl() {
    this.contactFormGroup = this._FB.group({
      email: ['', Validators.required],
      address: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    })
  }

  resetForm() {
    this.contactFormGroup.reset();
  }

  getBrandDetail() {
    this._CS.getContactInfoDetails().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.isUpdate = true;
         this.contactFormGroup.patchValue(data.data);
        }
      }
    )
  }

  addContactInfo() {
    if (this.contactFormGroup.valid) {
      this._CS.addContactInfoDetails(this.contactFormGroup.value).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.router.navigate(['/contact-info/details']);
            this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          }
          else {
            this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        },
        error => {
          this.alertMessage({ type: "danger", title: "Error Occured", value: error });
        }
      )
    }
  }
}
