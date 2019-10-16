import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    public apiService: ApiService,
  ) {
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.error.message === 'expired token') {
              this.apiService.renew();
            }
          }
          return of(err);
        }),
    );

  }


}
