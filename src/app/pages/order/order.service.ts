import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders() {
    const url = `${environment.apiUrl}order/all`;
    return this.http.get(url);
  }

  getAllOrdersByUserId(userId: string) {
    const url = `${environment.apiUrl}order/user/list?userId=${userId}`;
    return this.http.get(url);
  }

  getOrderDetails(orderId: string) {
    const url = `${environment.apiUrl}order/details/${orderId}`;
    return this.http.get(url);
  }

  refundOrderList(){
    const url=`${environment.apiUrl}order/refundproductlist`
    return this.http.get(url)
  }

  refundCompleted(obj){
    const url=`${environment.apiUrl}order/refundtouser`
    return this.http.post(url,obj)
  }
}
