import { Phrase } from './../../models/phrase';
import { CreateBanterComponent } from './../create-banter/create-banter.component';
import { Component, OnInit } from '@angular/core';
import { BanterService } from 'src/app/services/banter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-match-banter',
  templateUrl: './match-banter.component.html',
  styleUrls: ['./match-banter.component.css']
})
export class MatchBanterComponent implements OnInit {
  banterList: Phrase[] = [];
  matchId: number;

  constructor(private banterService: BanterService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.matchId = params.id;
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
      data: {matchId: this.matchId, teamId: 99}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
