import { RootComponent } from './../../../_shared/components/root/root.component';
import { AlertService } from './../../../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent extends RootComponent implements OnInit {

  vendors: any = [];

  constructor(private _VS: VendorService,public _AS:AlertService) {  
    super(_AS)
  }

  ngOnInit(): void {
    this.getAllVendors();
  }

  getAllVendors() {
    this._VS.getAllVendors().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.vendors = data.data;
        }
      }
    )
  }
  
  changeStatus(eve, vendorId: string) {
    let obj = {
      status: eve.target.checked ? 'active':'deactive',
      vendorId: vendorId
    }
    this._VS.updateVendorStatus(obj).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.getAllVendors();
          this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
        }
        else {
          this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    )
  }
}
