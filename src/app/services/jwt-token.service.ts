import { CookieService } from './cookie.service';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {
  jwtToken: string;
  decodedToken: any;

  constructor(private cookieService: CookieService) {
  }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  removeToken() {
    this.jwtToken = null;
    this.decodedToken = null;
  }

  decodeToken() {
    if (!this.jwtToken) {
      const cookie = this.cookieService.get(this.cookieService.keyStore.footballBanterAccessToken);
      if (cookie) {
        this.jwtToken = cookie;
      }
    }

    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getDecodeToken() {
    return jwt_decode(this.jwtToken);
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken;
  }

  getEmail() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.email : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  getUserId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.sub : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = parseInt(this.getExpiryTime(), 10);
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
