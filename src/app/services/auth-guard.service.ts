import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { JwtService } from './jwt.service';

@Injectable()
export class AuthGuardService implements CanLoad {

  constructor(
    private router: Router,
    private jwtService: JwtService
  ) {}

  canLoad(): boolean {
     if (this.jwtService.getToken()) {
       return true;
     } else {
       this.router.navigateByUrl('/login');
       return false;
     }
  }

}
