import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { DeliveryChargeService } from '../delivery-charge.service';

@Component({
  selector: 'app-edit-delivery-charge',
  templateUrl: './edit-delivery-charge.component.html',
  styleUrls: ['./edit-delivery-charge.component.css']
})
export class EditDeliveryChargeComponent extends RootComponent implements OnInit {

  deliveryChargeFormGroup: FormGroup;

  constructor(
    private _FB: FormBuilder,
    private _DS: DeliveryChargeService,
    public _AS: AlertService,
    private router: Router
  ) {
    super(_AS);
  }

  ngOnInit(): void {
    this.deliveryChargeFormGroup = this._FB.group({
      charges: ['', Validators.required]
    })
    this.getDeliveryChargeDetails();
  }

  getDeliveryChargeDetails() {
    this._DS.getDeliveryDetails().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.deliveryChargeFormGroup.patchValue(data.data);
        }
      }
    )
  }

  editDeliveryCharge() {
    if (this.deliveryChargeFormGroup.valid) {
      this._DS.addDeliveryCharge(this.deliveryChargeFormGroup.value).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.router.navigate(['/delivery-charge/detail']);
            this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          }
          else {
            this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }
      )
    }
  }

  resetForm() {
    this.deliveryChargeFormGroup.reset();
  }

}
