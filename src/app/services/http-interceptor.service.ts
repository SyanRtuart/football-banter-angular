import { retry, catchError } from 'rxjs/operators';
import { Injectable, Inject, Optional } from '@angular/core';
import { JwtTokenService } from './jwt-token.service';
import { HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { BusinessRuleException } from '../models/business-rule-exception';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private tokenService: JwtTokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.tokenService.jwtToken;
    req = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req)
      .pipe(retry(0),
      catchError(this.handleError), );
  }

  private handleError(err: HttpErrorResponse) {
    const error: any = err.error.detail;

    const exception: BusinessRuleException = error as BusinessRuleException;
    window.alert(error);
    return throwError(exception);
  }
}
