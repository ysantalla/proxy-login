import { observable } from 'rxjs/symbol/observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models/user.model';


@Injectable()
export class UserService {

  constructor (
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) {}

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
  }

  attemptAuth(user: string, pass: string): Observable<any> {
    return this.apiService.post('/auth', {user: user, pass: pass})
      .map(
        data => {
          const userAuth: User = {username: user, password: pass, token: data._body};
          this.setAuth(userAuth);
          return data;
        }
      );
  }

  statusUser(): Observable<any> {
    return this.apiService.get('/userStatus')
      .map(
        data => {
          return data;
        }
      );
  }

  logoutUser(): Observable<any> {
    return this.apiService.delete('/auth')
      .map(
        data => {
          this.purgeAuth();
          return data;
        }
      );
  }
}
