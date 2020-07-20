import { VoteRequest } from '../models/services/banter/vote-request';
import { CreatePhraseRequest } from '../models/services/banter/create-phrase-request';
import { retry, catchError } from 'rxjs/operators';
import { Phrase } from '../models/services/banter/phrase';
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
    getPhrasesByMatchId: 'phrase/getPhrases?matchId=',
    addPhrase: 'phrase/createPhrase',
    upvotePhrase: 'phrase/upvotePhrase?phraseId=',
    downvotePhrase: 'phrase/downvotePhrase?phraseId=',

  };

  constructor(private http: HttpClient) { }

  getPhrasesByMatchId(matchId: string): Observable<Phrase[]> {
    return this.http.get<Phrase[]>(this.apiUrl + this.apiRoutes.getPhrasesByMatchId + matchId);
  }

  add(request: CreatePhraseRequest) {
    console.log('Creating phrase at: ' + this.apiUrl + this.apiRoutes.addPhrase);
    return this.http.post<string>(this.apiUrl + this.apiRoutes.addPhrase, request);
  }

  upvote(phraseId: number) {
    const request: VoteRequest = new VoteRequest();
    request.phraseId = phraseId;
    return this.http.put(this.apiUrl + this.apiRoutes.upvotePhrase + phraseId, phraseId);
  }

  downvote(phraseId: number) {
    const request: VoteRequest = new VoteRequest();
    request.phraseId = phraseId;
    console.log('downvoting phrase at :' + this.apiUrl + this.apiRoutes.downvotePhrase);
    return this.http.put(this.apiUrl + this.apiRoutes.downvotePhrase + phraseId, phraseId);
  }

}
