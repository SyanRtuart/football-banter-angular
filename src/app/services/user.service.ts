import { User } from './../models/services/user/user';
import { LoginResponse } from './../models/services/user/login-response';
import { LoginRequest } from './../models/services/user/login-request';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/services/user/register-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  private apiRoutes = {
    login: 'userAccess/login',
    register: 'userAccess/register',
    getUser: 'userAccess/user?email=',
    uploadImage: 'userAccess/uploadImage'
  };

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + this.apiRoutes.login, request);
  }

  register(request: RegisterRequest) {
    request.login = request.email;
    return this.http.post(this.apiUrl + this.apiRoutes.register, request);
  }

  getUser(email: string) {
    return this.http.get<User>(this.apiUrl + this.apiRoutes.getUser + email);
  }

  uploadImage(file: File) {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post(this.apiUrl + this.apiRoutes.uploadImage, formData);
  }
}
