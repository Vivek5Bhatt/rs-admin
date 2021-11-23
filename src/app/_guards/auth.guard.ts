import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from "rxjs/operators";
import { UserService } from "../_services/index";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _US: UserService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._US.getAuth().pipe(
      take(1),
      map(state => !!state),
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

}
