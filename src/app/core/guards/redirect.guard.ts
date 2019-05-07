import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@app/core/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    console.log(this.authService.authenticated());

    if (this.authService.authenticated()) {
      this.router.navigate(['dashboard']);
      return false;
    }
        return true;
  }
}
