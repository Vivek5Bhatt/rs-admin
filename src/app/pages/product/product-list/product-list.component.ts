import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../_services";
import { RootComponent } from "../../../_shared/components/root/root.component";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent extends RootComponent implements OnInit {
  products: any = [];
  vendorId: string;

  constructor(
    private _PS: ProductService,
    public _AS: AlertService,
    private routes: ActivatedRoute
  ) {
    super(_AS);
  }

  ngOnInit(): void {
    this.routes.queryParams.subscribe((data) => {
      if (data && data.vendorId) {
        this.vendorId = data.vendorId;
        this.getAllProductsByVendorId();
      } else {
        this.getAllProducts();
      }
    });
  }

  getAllProducts() {
    this._PS.getAllProducts().subscribe((data: any) => {
      if (data.meta.status) {
        this.products = data.data;
      } else {
        this.alertMessage({
          type: "danger",
          title: "Error Occured",
          value: data.meta.msg,
        });
      }
    });
  }

  getAllProductsByVendorId() {
    this._PS.getAllProductsByVendorId(this.vendorId).subscribe((data: any) => {
      if (data.meta.status) {
        this.products = data.data;
      } else {
        this.alertMessage({
          type: "danger",
          title: "Error Occured",
          value: data.meta.msg,
        });
      }
    });
  }

  changeStatus(eve, productId: string) {
    let obj = {
      status: eve.target.checked ? "active" : "deactive",
      productId: productId,
    };
    this._PS.updateProductStatus(obj).subscribe((data: any) => {
      if (data.meta.status) {
        this.getAllProducts();
        this.alertMessage({
          type: "success",
          title: "Success",
          value: data.meta.msg,
        });
      } else {
        this.getAllProducts();
        this.alertMessage({
          type: "danger",
          title: "Error Occured",
          value: data.meta.msg,
        });
      }
    });
  }

  
  changeFeatureStatus(event, productId: string) {
    let object = {
      productId: productId,
      status: event.target.checked,
    };
    this._PS.updateFeatureStatus(object).subscribe((data: any) => {
      if (data.meta.status) {
        this.getAllProducts();
        this.alertMessage({
          type: "success",
          title: "Success",
          value: data.meta.msg,
        });
      } else {
        this.getAllProducts();
        this.alertMessage({
          type: "danger",
          title: "Error Occured",
          value: data.meta.msg,
        });
      }
    });
  }
}
