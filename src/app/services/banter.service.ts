import { CreatePhraseRequest } from './../models/create-phrase-request';
import { retry, catchError } from 'rxjs/operators';
import { Phrase } from './../models/phrase';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UpvotePhraseRequest } from '../models/upvote-phrase-request';
import { DownvotePhraseRequest } from '../models/downvote-phrase-request';

@Injectable({
  providedIn: 'root'
})
export class BanterService {

  private apiUrl = environment.apiUrl;

  private apiRoutes = {
    getPhrasesByMatchId: 'phrase/getPhrases?matchId=',
    addPhrase: 'phrase/createPhrase',
    upvotePhrase: 'phrase/upvotePhrase',
    downvotePhrase: 'phrase/downvotePhrase',

  };

  constructor(private http: HttpClient) { }

  getPhrasesByMatchId(matchId: number): Observable<Phrase[]> {
    return this.http.get<Phrase[]>(this.apiUrl + this.apiRoutes.getPhrasesByMatchId + matchId)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  add(request: CreatePhraseRequest): Observable<CreatePhraseRequest> {
    console.log('Creating phrase at: ' + this.apiUrl + this.apiRoutes.addPhrase);
    return this.http.post<CreatePhraseRequest>(this.apiUrl + this.apiRoutes.addPhrase, request)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  upvote(request: UpvotePhraseRequest): Observable<UpvotePhraseRequest> {
    console.log('Upvoting phrase at :' + this.apiUrl + this.apiRoutes.upvotePhrase);
    return this.http.post<UpvotePhraseRequest>(this.apiUrl + this.apiRoutes.upvotePhrase, request)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  downvote(request: DownvotePhraseRequest): Observable<DownvotePhraseRequest> {
    console.log('Upvoting phrase at :' + this.apiUrl + this.apiRoutes.downvotePhrase);
    return this.http.post<DownvotePhraseRequest>(this.apiUrl + this.apiRoutes.downvotePhrase, request)
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
