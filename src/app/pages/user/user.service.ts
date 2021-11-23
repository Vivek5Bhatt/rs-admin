import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    const url = `${environment.apiUrl}employees/users/list`;
    return this.http.get(url);
  }

  getUserDetails(userId: string) {
    const url = `${environment.apiUrl}employees/users/details?userId=${userId}`;
    return this.http.get(url);
  }
  updateUserStatus(status:any){
    const url = `${environment.apiUrl}employees/users/status`;
    return this.http.put(url, status);
  }
  sendNotification(notificationData:any){
    const url = `${environment.apiUrl}notification/send`;
    return this.http.post(url, notificationData);
  }

  getUserNotifications() {
    const url = `${environment.apiUrl}notification/user`;
    return this.http.get(url);
  }
}