import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }

  getAllVendors() {
    const url = `${environment.apiUrl}vendor/list`;
    return this.http.get(url);
  }

  getVendorDetails(vendorId: string) {
    const url = `${environment.apiUrl}vendor/details?vendorId=${vendorId}`;
    return this.http.get(url);
  }

  approveRejectKyc(kycData: Object) {
    const url = `${environment.apiUrl}vendor/kyc/status`;
    return this.http.put(url, kycData);
  }
  updateVendorStatus(status:any){
    const url = `${environment.apiUrl}vendor/status`;
    return this.http.put(url, status);
  }
  senNotification(vendorData:any){
    const url = `${environment.apiUrl}notification/send/vendor`;
    return this.http.post(url, vendorData); 
  }

  getVendorNotification(){
    const url = `${environment.apiUrl}notification/vendor`;
    return this.http.get(url); 
  }
}
