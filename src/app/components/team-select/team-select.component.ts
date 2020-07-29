import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/services/match/team';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-team-select',
  templateUrl: './team-select.component.html',
  styleUrls: ['./team-select.component.css']
})
export class TeamSelectComponent implements OnInit {
  displayedColumns: string[] = ['logo', 'name', 'league', 'country'];
  dataSource: MatTableDataSource<Team>;
  isLoading: boolean;

  constructor(private matchService: MatchService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.loadTeams();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadTeams() {
    this.isLoading = true;
    this.matchService.getTeams().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.isLoading = false;
    });
  }

  selectTeam(team: Team) {
    this.router.navigate(['/recent-results', team.id]);
  }

  clicked() {
    console.log('row clicked RSRS');
  }
}
