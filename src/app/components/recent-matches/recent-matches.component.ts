import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Match } from 'src/app/models/match';

@Component({
  selector: 'app-recent-matches',
  templateUrl: './recent-matches.component.html',
  styleUrls: ['./recent-matches.component.css']
})
export class RecentMatchesComponent implements OnInit {

  results: Match[] = [];
  selectedTeamId: number;

  constructor(private matchService: MatchService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedTeamId = params.id
    });

    this.getRecentMatches();
  }

  getRecentMatches() {
    this.matchService.getRecentMatchesByTeamId(this.selectedTeamId).subscribe(response =>
      this.results = response);

  }

  getBanter(match: Match) {
    this.router.navigate(['/match-banter', match.id]);
  }
}
