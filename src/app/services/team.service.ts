import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = environment.apiUrl;

  private apiRoutes = {
    getTeams: 'match/getTeams'
  }

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl + this.apiRoutes.getTeams)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

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
