import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AffliateService {

  constructor(private http: HttpClient) { }

  getAllAffliate() {
    const url = `${environment.apiUrl}affliate/list`;
    return this.http.get(url);
  }

  updateAffliateStatus(status:any){
    const url = `${environment.apiUrl}affliate/status`;
    return this.http.put(url, status);
  }

  addAffliate(status: FormData) {
    const url = `${environment.apiUrl}affliate/content`;
    return this.http.post(url, status);
  }

  getAffliateDetails() {
    const url = `${environment.apiUrl}affliate/content`;
    return this.http.get(url);
  }

  addWallet(status: any) {
    const url = `${environment.apiUrl}employees/users/wallet/addamount`;
    return this.http.put(url, status);
  }

}
