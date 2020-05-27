import { BanterService } from 'src/app/services/banter.service';
import { Component, OnInit, Input } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-upvote-button',
  templateUrl: './upvote-button.component.html',
  styleUrls: ['./upvote-button.component.css']
})
export class UpvoteButtonComponent implements OnInit {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  @Input() score: number;
  @Input() phraseId: number;

  userVote = 0;

  constructor(private banterService: BanterService) { }

  ngOnInit(): void {
  }

  upvote() {
    //ToDo: Stop users from sending multiple votes
    const vote = this.userVote === 1 ? 0 : 1;
    this.score += vote;
    this.userVote = vote;
  }

  downvote() {
    const vote = this.userVote === -1 ? 0 : -1;
    this.score += vote;
    this.userVote = vote;
  }

}
