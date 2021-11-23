import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent extends RootComponent implements OnInit {

  brands: any[] = []

  constructor(private _BS: BrandService, public _AS:AlertService) {
    super(_AS)
   }

  ngOnInit(): void {
    this.getBrandList();
  }

  getBrandList() {
    this._BS.getBrandList().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.brands = data.data;
        }
      }
    )
  }

  changeStatus(eve, brandId: string) {
    let obj = {
      status: eve.target.checked ? 'active':'deactive',
      brandId: brandId
    }
    this._BS.changeStatus(obj).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.getBrandList();
          this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
        }
        else {
          this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    )
  }

}
