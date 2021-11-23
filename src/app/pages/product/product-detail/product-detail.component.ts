import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent extends RootComponent implements OnInit {

  productId: string;
  productDetails: any;

  constructor(private _PS: ProductService, private route: ActivatedRoute, public _AS: AlertService) {super(_AS) }

  ngOnInit(): void {
    this.route.params.subscribe(
      data => {
        this.productId = data.productId;
        this.getProductDetails();
      }
    )
  }

  getProductDetails() {
    this._PS.getProductByProductId(this.productId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.productDetails = data.data;
        }
      }
    )
  }

  changeVariantStatus(event,variant){
    let obj = {
      status: event.target.checked ? "active" : "deactive",
      variantId: variant.variantId,
    };
    this._PS.updateVariantStatus(obj).subscribe((data: any) => {
      if (data.meta.status) {
        this.getProductDetails();
        this.alertMessage({
          type: "success",
          title: "Success",
          value: data.meta.msg,
        });
      } else {
        this.getProductDetails();
        this.alertMessage({
          type: "danger",
          title: "Error Occured",
          value: data.meta.msg,
        });
       setTimeout(()=>{
         location.reload();
       },3000)
      }
    });
  }
}
