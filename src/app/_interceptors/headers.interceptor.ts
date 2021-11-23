import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";

import { Observable } from "rxjs";
// 

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin && admin.authKey && admin.adminId) {
      request = request.clone({
        headers: new HttpHeaders({
          authKey: admin.authKey,
          adminId: admin.adminId
        })
      });
    }
    return next.handle(request);
  }
}
