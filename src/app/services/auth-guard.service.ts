import { CookieService } from './cookie.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private jwtService: JwtTokenService, private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const cookieToken = this.cookieService.get('footballBanterAccessToken');
    this.jwtService.setToken(cookieToken);
    if (this.jwtService.getUser() != null) {
      if (this.jwtService.isTokenExpired()) {
        //Redirect to login
        this.router.navigate(['/login'], {
          queryParams: {
            return: state.url
          }
        });
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
