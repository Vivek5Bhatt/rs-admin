import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  constructor(private http:HttpClient) { }

  getContactInfoDetails() {
    const url = `${environment.apiUrl}contactinfo/details`;
    return this.http.get(url);
  }

  addContactInfoDetails(data) {
    const url = `${environment.apiUrl}contactinfo/add`;
    return this.http.post(url,data);
  }

}
