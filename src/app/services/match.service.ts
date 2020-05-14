import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Team } from '../models/team';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private apiUrl = environment.apiUrl;

  private apiRoutes = {
    getTeams: 'match/getTeams',
    getRecentMatchesByTeamId: 'match/getRecentMatches?teamId='
  };

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl + this.apiRoutes.getTeams)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getRecentMatchesByTeamId(teamId: number): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiUrl + this.apiRoutes.getRecentMatchesByTeamId + teamId)
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
