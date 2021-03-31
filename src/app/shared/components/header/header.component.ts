import { CookieService } from './../../../services/cookie.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private jwtService: JwtTokenService, private cookieService: CookieService) { }

  ngOnInit(): void {
  }


  toggleSidebar() {
    this.toggleSideBarForMe.emit();
  }

  signout() {
    this.cookieService.remove(this.cookieService.keyStore.footballBanterAccessToken);
    this.jwtService.removeToken();
    this.router.navigate(['/login']);
  }

  navigateToAccount() {
    this.router.navigate(['/account'], {queryParams: {returnUrl: this.router.url}});
  }
}
