import { Injectable } from '@angular/core';
import { Result } from '../models/results';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  results: Result[] = [
    {homeTeam: 'Celtic', homeScore: 2, awayTeam: 'Rangers', awayScore: 2},
    {homeTeam: 'Celtic', homeScore: 0, awayTeam: 'Aberdeen', awayScore: 1},
    {homeTeam: 'Celtic', homeScore: 4, awayTeam: 'Motherwell', awayScore: 2},
    {homeTeam: 'Celtic', homeScore: 1, awayTeam: 'Livingston', awayScore: 0},
    {homeTeam: 'Celtic', homeScore: 2, awayTeam: 'Ross County', awayScore: 3},
    {homeTeam: 'Celtic', homeScore: 0, awayTeam: 'Kilmarnock', awayScore: 0},
    {homeTeam: 'Celtic', homeScore: 1, awayTeam: 'Hibernian', awayScore: 1}
  ];

  constructor() { }

  getResults(team: string): Observable<Result[]> {
    return of(this.results);
  }
}
