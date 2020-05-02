import { Component, OnInit } from '@angular/core';
import { BanterService } from 'src/app/services/banter.service';
import { Banter } from 'src/app/models/banter';

@Component({
  selector: 'app-generate-banter',
  templateUrl: './generate-banter.component.html',
  styleUrls: ['./generate-banter.component.css']
})
export class GenerateBanterComponent implements OnInit {

  banterFor: Banter[] = [];
  banterAgainst: Banter[] = [];

  constructor(private banterService: BanterService) { }

  ngOnInit(): void {
    this.loadBanter();
  }

  loadBanter() {
    this.banterService.getBanter().subscribe(response => {
      this.banterFor = response.filter(x => x.type === 'For');
      this.banterAgainst = response.filter(x => x.type === 'Against');
    });
  }
}
