import { Injectable, Inject, Optional } from '@angular/core';
import { JwtTokenService } from './jwt-token.service';
import { HttpRequest, HttpHandler } from '@angular/common/http';

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
    return next.handle(req);
  }
}
