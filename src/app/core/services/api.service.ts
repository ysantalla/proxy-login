import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public dicover(): Observable<any> {
    return this.httpClient.post<any>(env.urlProxy, {cmd: 'discover', manager: 'resources'});
  }

  public login(user: string, pass: string): Observable<any> {
    const requestOptions: any = {
      responseType: 'text'
    };

    return this.httpClient.post<any>(env.urlProxy, {cmd: 'open', manager: 'sessions', cred: {user: user, pass: pass}},
        requestOptions);
  }

  public comandGet(manager: string, token: string): Observable<any> {
    return this.httpClient.post<any>(env.urlProxy, {cmd: 'get', manager: manager, secret: token});
  }

  public renew(token: string): Observable<any> {
    return this.httpClient.post<any>(env.urlProxy, {cmd: 'renew', manager: 'sessions', secret: token});
  }

  public set(token: string, user: string, Uint64: number, manager: string): Observable<any> {
    return this.httpClient.post<any>(env.urlProxy, {cmd: 'set', manager: manager,
              isAdmin: true, secret: token, string: user, uint64: Uint64});
  }

  public logout(token: string): Observable<any> {
    return this.httpClient.post<any>(env.urlProxy, {cmd: 'close', manager: 'sessions', secret: token});
  }
}
