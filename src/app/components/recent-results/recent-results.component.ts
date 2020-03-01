import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { ResultsService } from 'src/app/services/results.service';
import { Result } from 'src/app/models/results';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-results',
  templateUrl: './recent-results.component.html',
  styleUrls: ['./recent-results.component.css']
})
export class RecentResultsComponent implements OnInit {

  results: Result[] = [];

  constructor(private resultsService: ResultsService, private router: Router) {}

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.batchId = params.id;
    // });
    this.getResults();
  }

  getResults() {
    this.resultsService.getResults('Celtic').subscribe(results =>
      this.results = results);
  }

  getBanter() {
    this.router.navigate(['/generate-banter']);
  }
}
