import { State } from './../../models/state';
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
  isLoading = false;
  hasError = false;
  state: State;

  constructor(private userService: UserService, private formBuilder: FormBuilder,
              private tokenService: JwtTokenService, private cookieService: CookieService,
              private router: Router) {

    this.state = this.router.getCurrentNavigation().extras.state;
    this.createForm();
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.login();
  }

  login() {
    this.isLoading = true;
    this.userService.login(this.loginForm.value).subscribe(response => {
      this.tokenService.setToken(response.accessToken);
      this.cookieService.set('footballBanterAccessToken', response.accessToken);
      this.router.navigate(['/dashboard']);
    }, error => {
      this.hasError = true;
      this.isLoading = false;
    });
  }

  register() {
    this.router.navigate(['/register']);
  }

  get f() { return this.loginForm.controls; }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.email, Validators.required
      ])],
      password: ['', Validators.required],
    });
  }
}
