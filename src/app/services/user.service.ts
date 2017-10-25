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

  setAuth(token: string) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(token);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
  }

  isAutenticated(): boolean {
    if (this.jwtService.getToken()){
      return true;
    } else {
      return false;
    }
  }

  attemptAuth(user: string, pass: string): Observable<any> {
    return this.apiService.post('/auth', {user: user, pass: pass})
      .map(
        data => {
          this.setAuth(data.scrt);
          return data;
        }
      );
  }

  statusUser(): Observable<any> {
    return this.apiService.get('/userStatus')
      .map(
        data => data
      );
  }

  changeQuota(username: string, value: number): Observable<any> {
    return this.apiService.put('/userStatus', {name: username, value: value})
      .map(
        data => data
      );
  }

  logoutUser(): Observable<any> {
    return this.apiService.delete('/auth')
      .map(
        data => {
          this.purgeAuth();
          data;
        }
      );
  }
}
