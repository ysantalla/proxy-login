import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public logout(token: string): Observable<any> {
    return this.httpClient.post<any>(env.urlProxy, {cmd: 'close', manager: 'sessions', secret: token});
  }
}
