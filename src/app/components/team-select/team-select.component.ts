import { TeamService } from './../../services/team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-select',
  templateUrl: './team-select.component.html',
  styleUrls: ['./team-select.component.css']
})
export class TeamSelectComponent implements OnInit {

  teams: Team[] = [];

  constructor(private teamService: TeamService, private router: Router) { }

  ngOnInit() {
    this.populateTeams();
  }

  populateTeams() {
    this.teamService.getTeams().subscribe(response =>
      this.teams = response);
  }

  selectTeam(team: Team) {
    console.log(team.name);
    this.router.navigate(['/recent-results']);
  }
}
