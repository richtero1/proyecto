import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService} from './services/auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.user.pipe(
        take(1), //exclusion mutua solo puede haber uno en el mismo momento
        map(user => user && user.roles.admin ? true : false),
        tap(isAdmin => {
          if (!isAdmin) {
            console.log('Acceso negado, solo Admins');
            window.alert('Acceso negado, solo Admins');
           
          }
      })
 )
  }
}
