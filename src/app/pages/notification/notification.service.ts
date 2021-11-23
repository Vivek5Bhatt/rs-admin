import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getAllNotification() {
    const url = `${environment.apiUrl}notification/delivery`;
    return this.http.get(url);
  }

}
