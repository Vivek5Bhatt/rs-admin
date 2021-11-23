import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { MeasurementUnitService } from '../measurement-unit.service';

@Component({
  selector: 'app-add-measurement-unit',
  templateUrl: './add-measurement-unit.component.html',
  styleUrls: ['./add-measurement-unit.component.css']
})
export class AddMeasurementUnitComponent extends RootComponent implements OnInit {

  measurementFormGroup: FormGroup
  measurementId: any;
  isUpdate : boolean = false
  constructor(private _FB: FormBuilder, 
    private _MS: MeasurementUnitService, 
    private router: Router,
    private routes: ActivatedRoute,
    public _AS: AlertService) {
    super(_AS)
  }

  ngOnInit(): void {
    this.formControl();
    this.routes.queryParams.subscribe(params => {
      if (params.measurementId) {
        this.measurementId = params.measurementId;
        this.getmeasurementDetail(params.measurementId)
      }
    })
  }

  formControl() {
    this.measurementFormGroup = this._FB.group({
      measurementName: ['', Validators.required],
      measurementUnit: ['', Validators.required]
    })
  }

  resetForm() {
    this.measurementFormGroup.reset();
  }

  getmeasurementDetail(measurementId) {
    this._MS.getMeasurementDetails(measurementId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.isUpdate = true;
         this.measurementFormGroup.patchValue(data.data);
        }
      }
    )
  }

  addBrand() {
    if (this.measurementFormGroup.valid) {
      this._MS.addMeasurement(this.measurementFormGroup.value).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.router.navigate(['/measurement/list']);
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
    if (this.measurementFormGroup.valid) {
      const updateObj = {
       ...this.measurementFormGroup.value,
        measurementId: this.measurementId
      }
      this._MS.updateMeasurement(updateObj).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.router.navigate(['/measurement/list']);
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
