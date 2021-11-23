import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent extends RootComponent implements OnInit {

  brandFormGroup: FormGroup
  brandId: any;
  isUpdate : boolean = false
  constructor(private _FB: FormBuilder, 
    private _BS: BrandService, 
    private router: Router,
    private routes: ActivatedRoute,
    public _AS: AlertService) {
    super(_AS)
  }

  ngOnInit(): void {
    this.formControl();
    this.routes.queryParams.subscribe(params => {
      if (params.brandId) {
        this.brandId = params.brandId;
        this.getBrandDetail(params.brandId)
      }
    })
  }

  formControl() {
    this.brandFormGroup = this._FB.group({
      brandName: ['', Validators.required]
    })
  }

  resetForm() {
    this.brandFormGroup.reset();
  }

  getBrandDetail(brandId) {
    this._BS.getBrandDetails(brandId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.isUpdate = true;
         this.brandFormGroup.patchValue(data.data);
        }
      }
    )
  }

  addBrand() {
    if (this.brandFormGroup.valid) {
      this._BS.addBrand(this.brandFormGroup.value).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.router.navigate(['/brand/list']);
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

  updateBrand() {
    if (this.brandFormGroup.valid) {
      const updateObj = {
        brandName: this.brandFormGroup.value.brandName,
        brandId: this.brandId
      }
      this._BS.updateBrand(updateObj).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.router.navigate(['/brand/list']);
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
