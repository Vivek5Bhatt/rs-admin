import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserService } from "../_services/index";
import { Router } from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private us: UserService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errMsg = "";
        // Client Side Error
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error: ${error.error.message}`;
        } else if (error.status === 401 || error.status === 440) {
          // Server Side Error
          errMsg = `Error Code: ${error.status},  Message: ${error.error.meta.msg}`;
          this.us.updateAdminAuth(false, null);
          localStorage.clear();
          this.router.navigateByUrl("/login");
        }
        return throwError(errMsg);
      })
    );
  }
}
