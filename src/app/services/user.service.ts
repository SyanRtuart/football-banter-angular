import { LoginResponse } from './../models/services/user/login-response';
import { retry, catchError } from 'rxjs/operators';
import { LoginRequest } from './../models/services/user/login-request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  private apiRoutes = {
    login: 'userAccess/login',
    register: 'userAccess/register'
  };

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + this.apiRoutes.login, request)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // TODO: Find a better place for this, it's in multiple classes
  private handleError(err: HttpErrorResponse) {
    const errorMessages = [];

    if (err.error instanceof Error) {
      errorMessages[0] = `An error occurred: ${err.error.message}`;
    } else {
      errorMessages[0] = `Server returned code: ${err.status}, error message is: ${err.message}`;
      if (err.error.errors) {
        let i = 1;
        err.error.errors.forEach((e: any) => {
          errorMessages[i] = e;
          i = i + 1;
        });
      }
    }

    return throwError(errorMessages);
  }
}
