import { Match } from './../../models/match';
import { Phrase } from './../../models/phrase';
import { CreateBanterComponent } from './../create-banter/create-banter.component';
import { Component, OnInit } from '@angular/core';
import { BanterService } from 'src/app/services/banter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-banter',
  templateUrl: './match-banter.component.html',
  styleUrls: ['./match-banter.component.css']
})
export class MatchBanterComponent implements OnInit {
  banterList: Phrase[] = [];
  matchId: string;
  match: Match;
  newPhrase: Phrase;

  constructor(private banterService: BanterService, private matchService: MatchService, private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.matchId = params.id;

      this.matchService.getMatch(this.matchId).subscribe(response => this.match = response);
    });
    this.loadBanter();
  }

  loadBanter() {
    this.banterService.getPhrasesByMatchId(this.matchId).subscribe(response => this.banterList = response);
  }

  addNew(): void {
    const dialogRef = this.dialog.open(CreateBanterComponent, {
      width: '250px',
      disableClose: true,
      data: {matchId: this.matchId, teamId: this.match.homeTeamId, phrase: this.newPhrase}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newPhrase = result;
      this.banterList.push(this.newPhrase);
      console.log('The dialog was closed');

    });
  }

}
