import { Router } from '@angular/router';
import { CookieService } from './../../services/cookie.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { JwtTokenService } from 'src/app/services/jwt-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  model: any = {};
  submitted = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder,
              private tokenService: JwtTokenService, private cookieService: CookieService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }


  login() {
    this.userService.login(this.loginForm.value).subscribe(response => {
      this.tokenService.setToken(response.accessToken);
      this.cookieService.set('footballBanterAccessToken', response.accessToken);
      this.router.navigate(['/dashboard']);
    });
  }

  register() {
    this.router.navigate(['/register']);
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
