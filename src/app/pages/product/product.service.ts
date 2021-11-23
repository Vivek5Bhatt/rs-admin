import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    const url = `${environment.apiUrl}products/list`;
    return this.http.get(url);
  }

  getAllProductsByVendorId(vendorId:string) {
    const url = `${environment.apiUrl}products/vendor/list?vendorId=${vendorId}`;
    return this.http.get(url);
  }

  getProductByProductId(productId: string) {
    const url = `${environment.apiUrl}products/details/${productId}`;
    return this.http.get(url);
  }

  updateProductStatus(status:any){
    const url = `${environment.apiUrl}products/status`;
    return this.http.put(url,status)
  }

  updateFeatureStatus(status:any){
    const url = `${environment.apiUrl}products/featurestatus`;
    return this.http.put(url,status)
  }

  updateVariantStatus(status:any){
    const url = `${environment.apiUrl}products/variant/status`;
    return this.http.put(url,status)
  }
}
