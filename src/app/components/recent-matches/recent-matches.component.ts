import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Match } from 'src/app/models/services/match/match';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-recent-matches',
  templateUrl: './recent-matches.component.html',
  styleUrls: ['./recent-matches.component.css']
})
export class RecentMatchesComponent implements OnInit {
  displayedColumns: string[] = [
    'homeTeamLogo',
    'homeTeam',
    'scoreHomeTeam',
    'awayTeamLogo',
    'awayTeam',
    'scoreAwayTeam',
    'utcDate',
    'kickOff',
    'status',
    'season',
  ];
  dataSource: MatTableDataSource<Match>;
  isLoading: boolean;

  selectedTeamId: string;

  constructor(private matchService: MatchService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedTeamId = params.id;
    });
    this.isLoading = true;
    this.getRecentMatches();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecentMatches() {
    this.isLoading = true;
    this.matchService.getMatchesByTeamId(this.selectedTeamId).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.isLoading = false;
    });
  }

  getBanter(match: Match) {
    this.router.navigate(['/match-banter', match.id]);
  }
}
