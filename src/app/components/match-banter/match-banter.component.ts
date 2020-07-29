import { Match } from '../../models/services/match/match';
import { Phrase } from '../../models/services/banter/phrase';
import { CreateBanterComponent } from './../create-banter/create-banter.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BanterService } from 'src/app/services/banter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatchService } from 'src/app/services/match.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-match-banter',
  templateUrl: './match-banter.component.html',
  styleUrls: ['./match-banter.component.css']
})
export class MatchBanterComponent implements OnInit {
  displayedColumns: string[] = ['score', 'createdBy', 'description'];
  dataSource: MatTableDataSource<Phrase>;
  isLoading: boolean;
  matchId: string;
  match: Match;
  newPhrase: Phrase;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private banterService: BanterService,
              private matchService: MatchService,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.matchId = params.id;

      this.matchService.getMatch(this.matchId)
        .subscribe(response => this.match = response);
    });
    this.loadBanter();
  }

  loadBanter() {
    this.isLoading = true;
    this.banterService.getPhrasesByMatchId(this.matchId)
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
      });
    this.isLoading = false;
  }

  addNew(): void {
    const dialogRef = this.dialog.open(CreateBanterComponent, {
      width: '250px',
      disableClose: true,
      data: { matchId: this.matchId, teamId: this.match.homeTeamId, phrase: this.newPhrase }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newPhrase = result;
      this.dataSource.data.push(this.newPhrase);
      this.dataSource.data = this.dataSource.data;
    });
  }

}
