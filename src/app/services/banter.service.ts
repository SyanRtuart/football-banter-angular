import { retry, catchError } from 'rxjs/operators';
import { Phrase } from './../models/phrase';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BanterService {

  private apiUrl = environment.apiUrl;

  private apiRoutes = {
    getPhrasesByMatcHId: 'phrase/getPhrases?matchId='
  }

  constructor(private http: HttpClient) { }

  getPhrasesByMatchId(matchId: number): Observable<Phrase[]> {
    return this.http.get<Phrase[]>(this.apiUrl + this.apiRoutes.getPhrasesByMatcHId + matchId)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
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
