import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/services/match/team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-select',
  templateUrl: './team-select.component.html',
  styleUrls: ['./team-select.component.css']
})
export class TeamSelectComponent implements OnInit {

  teams: Team[] = [];

  constructor(private matchService: MatchService, private router: Router) { }

  ngOnInit() {
    this.populateTeams();
  }

  populateTeams() {
    this.matchService.getTeams().subscribe(response =>
      this.teams = response);
  }

  selectTeam(team: Team) {
    this.router.navigate(['/recent-results', team.id]);
  }
}
