import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryChargeService {

  constructor(private http: HttpClient) { }

  addDeliveryCharge(deliveryData: any) {
    const url = `${environment.apiUrl}deliverycharges/add`;
    return this.http.post(url, deliveryData);
  }

  getDeliveryDetails() {
    const url = `${environment.apiUrl}deliverycharges/details`;
    return this.http.get(url);
  }

}
