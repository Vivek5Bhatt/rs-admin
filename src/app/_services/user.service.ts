import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = new BehaviorSubject(false);
  private admin = new BehaviorSubject(<any>null);

  constructor(private http: HttpClient) { }

  // output to Auth Guard and Other Component
  getAuth(): Observable<boolean> {
    return this.auth.asObservable();
  }

  getAdmin(): Observable<any> {
    return this.admin.asObservable();
  }

  // If login is true
  updateAdminAuth(authState: boolean, admin: any) {
    this.auth.next(authState);
    this.admin.next(admin);
  }

  login(loginData: any) {
    const url = `${environment.apiUrl}employees/login`;
    return this.http.post(url, loginData);
  }

  logout() {
    const url = `${environment.apiUrl}employees/logout`;
    return this.http.get(url);
  }

}
