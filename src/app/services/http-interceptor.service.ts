import { NotificationService } from './notification.service';
import { retry, catchError } from 'rxjs/operators';
import { Injectable, Inject, Optional } from '@angular/core';
import { JwtTokenService } from './jwt-token.service';
import { HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { BusinessRuleException } from '../models/business-rule-exception';
import { throwError } from 'rxjs';
import { NotificationMessage, NotificationType } from '../models/notification-message';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private tokenService: JwtTokenService, private notificationService: NotificationService) { }

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
      catchError(error => this.handleError(error)));
  }

  private handleError(err: HttpErrorResponse) {
    const error: any = err.message;

    var notificationMessage = new NotificationMessage(error, NotificationType.error);

    this.notificationService.sendNotification(notificationMessage);

    const exception: BusinessRuleException = error as BusinessRuleException;
    return throwError(exception);
  }
}
