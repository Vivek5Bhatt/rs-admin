import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {

  constructor(private http: HttpClient) { }

  getProfileDetails() {
    const url = `${environment.apiUrl}employees/profile`;
    return this.http.get(url);
  }

}
