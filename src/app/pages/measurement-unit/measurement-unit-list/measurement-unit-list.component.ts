import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { MeasurementUnitService } from '../measurement-unit.service';

@Component({
  selector: 'app-measurement-unit-list',
  templateUrl: './measurement-unit-list.component.html',
  styleUrls: ['./measurement-unit-list.component.css']
})
export class MeasurementUnitListComponent extends RootComponent implements OnInit {

  measurements: any[]=[]
  constructor(private _MS: MeasurementUnitService,
    public _AS: AlertService) {
      super(_AS)
     }

  ngOnInit(): void {
    this.getAllMeasurementUnit();
  }

  getAllMeasurementUnit() {
    this._MS.getMeasurementList().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.measurements = data.data;
        }
      }
    )
  }

  changeStatus(eve, measurementId: string) {
    let obj = {
      status: eve.target.checked ? 'active':'deactive',
      measurementId: measurementId
    }
    this._MS.changeStatus(obj).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.getAllMeasurementUnit();
          this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
        }
        else {
          this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    )
  }

  deleteMeasurement(measurementId: string) {
    this._MS.deleteMeasurement(measurementId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.getAllMeasurementUnit();
          this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
        }
        else {
          this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    )
  }

}
