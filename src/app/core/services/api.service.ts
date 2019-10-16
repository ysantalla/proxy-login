import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '@env/environment';
import { LocalStorageService } from './local-storage.service';


const TOKEN_PREFIX = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
  ) { }

  public dicover(): Observable<any> {
    return this.httpClient.post<any>(env.urlProxy, {cmd: 'discover', manager: 'rules'});
  }

  public login(user: string, pass: string): Observable<any> {
    const requestOptions: any = {
      responseType: 'text'
    };

    return this.httpClient.post<any>(env.urlProxy, {cmd: 'open', manager: 'sessions', cred: {user, pass}},
        requestOptions);
  }

  public comandGet(manager: string, token: string): Observable<any> {
    return this.httpClient.post<any>(env.urlProxy, {cmd: 'get', manager, secret: token});
  }

  public renew(): void {
    const token = this.localStorageService.getItem(TOKEN_PREFIX);
    const requestOptions: any = {
      responseType: 'text'
    };
    this.httpClient.post<any>(env.urlProxy, {cmd: 'renew', manager: 'sessions',
                   secret: token}, requestOptions).subscribe((newToken: any) => {
      this.localStorageService.setItem(TOKEN_PREFIX, newToken);
    });
  }

  public set(token: string, user: string, Uint64: number, manager: string): Observable<any> {
    return this.httpClient.post<any>(env.urlProxy, {cmd: 'set', manager,
              isAdmin: true, secret: token, string: user, uint64: Uint64});
  }

  public logout(token: string): Observable<any> {
    return this.httpClient.post<any>(env.urlProxy, {cmd: 'close', manager: 'sessions', secret: token});
  }
}
