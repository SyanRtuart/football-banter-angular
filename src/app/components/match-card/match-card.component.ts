import { Match } from 'src/app/models/services/match/match';
import { Component, OnInit, Input } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.css']
})
export class MatchCardComponent implements OnInit {
  @Input() match: Match;

  constructor() {
  }

  ngOnInit(): void {

  }

}
