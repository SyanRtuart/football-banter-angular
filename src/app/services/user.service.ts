import { LoginResponse } from './../models/services/user/login-response';
import { LoginRequest } from './../models/services/user/login-request';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/services/user/register-request';
import { ChangePasswordRequest } from '../models/services/user/change-password-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  private apiRoutes = {
    login: 'userAccess/login',
    register: 'userAccess/register',
    getUser: 'userAccess/user?email=',
    uploadImage: 'userAccess/uploadPicture',
    changePassword: 'userAccess/changePassword'
  };

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + this.apiRoutes.login, request);
  }

  register(request: RegisterRequest) {
    request.login = request.email;
    return this.http.post(this.apiUrl + this.apiRoutes.register, request);
  }

  changePassword(request: ChangePasswordRequest) {
    return this.http.post(this.apiUrl + this.apiRoutes.changePassword, request);
  }
}
