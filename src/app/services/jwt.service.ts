import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  getToken(): string {
    return window.localStorage.getItem('jwtTokenProxy');
  }

  saveToken(token: string): void {
    window.localStorage.setItem('jwtTokenProxy', token);
  }

  destroyToken(): void {
    window.localStorage.removeItem('jwtTokenProxy');
  }

}
