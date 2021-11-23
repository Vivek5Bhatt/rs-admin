import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) { }

  addDiscount(discountData: FormData) {
    const url = `${environment.apiUrl}discount/add`;
    return this.http.post(url, discountData);
  }

  discountList() {
    const url = `${environment.apiUrl}discount/list`;
    return this.http.get(url);
  }

  editDiscount(discountData: FormData) {
    const url = `${environment.apiUrl}discount/update`;
    return this.http.put(url, discountData);
  }

  getDiscountDetails(discountId: string) {
    const url = `${environment.apiUrl}discount/details/${discountId}`;
    return this.http.get(url);
  }

}
