import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Team } from '../models/services/match/team';
import { Match } from '../models/services/match/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private apiUrl = environment.apiUrl;

  private apiRoutes = {
    getTeams: 'match/getTeams',
    getRecentMatchesByTeamId: 'match/getRecentMatches?teamId=',
    getMatch: 'match/getMatch?id='
  };

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl + this.apiRoutes.getTeams);
  }

  getRecentMatchesByTeamId(teamId: string): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiUrl + this.apiRoutes.getRecentMatchesByTeamId + teamId);
  }

  getMatch(matchId: string): Observable<Match> {
    return this.http.get<Match>(this.apiUrl + this.apiRoutes.getMatch + matchId);
  }


}
