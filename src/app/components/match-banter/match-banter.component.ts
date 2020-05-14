import { CreateBanterComponent } from './../create-banter/create-banter.component';
import { Component, OnInit } from '@angular/core';
import { Banter } from 'src/app/models/banter';
import { BanterService } from 'src/app/services/banter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-match-banter',
  templateUrl: './match-banter.component.html',
  styleUrls: ['./match-banter.component.css']
})
export class MatchBanterComponent implements OnInit {

  banter: Banter[] = [];
  selectedMatchId: number;

  constructor(private banterService: BanterService,  private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedMatchId = params.id
    });

  }

  loadBanter() {
  }

  addNew() {
    console.log('worked');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateBanterComponent, {
      width: '250px',
      disableClose: true,
      data: {name: 'this.name', animal: 'this.animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
