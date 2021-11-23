import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  addBrand(bannerData: FormData) {
    const url = `${environment.apiUrl}brand/add`;
    return this.http.post(url, bannerData);
  }

  updateBrand(bannerData: object) {
    const url = `${environment.apiUrl}brand/update`;
    return this.http.put(url, bannerData);
  }

  changeStatus(statusData: object) {
    const url = `${environment.apiUrl}brand/status`;
    return this.http.put(url, statusData);
  }

  getBrandList() {
    const url = `${environment.apiUrl}brand/list`;
    return this.http.get(url);
  }

  getBrandDetails(brandId:String) {
    const url = `${environment.apiUrl}brand/details/${brandId}`;
    return this.http.get(url);
  }
}
