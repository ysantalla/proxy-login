import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable()
export class JwtService {

  getToken(): string {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('jwtTokenProxy');
    }
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('jwtTokenProxy', token);
    }
  }

  destroyToken(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('jwtTokenProxy');
    }
  }

}

