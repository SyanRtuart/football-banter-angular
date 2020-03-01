import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teams: Team[] = [
    {name: 'Celtic'},
    {name: 'Rangers'}
  ];

  constructor() { }

  getTeams(): Observable<Team[]> {
    return of(this.teams);
  }


}
