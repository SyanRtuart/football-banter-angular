import { PhraseService } from './../../../services/phrase.service';
import { JwtTokenService } from './../../../services/jwt-token.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/services/phrase/member-response';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  imageUrl: any;
  member: Member;

  constructor(private phraseService: PhraseService, private tokenService: JwtTokenService) { }

  ngOnInit(): void {
    this.phraseService.getMember(this.tokenService.getUserId()).subscribe(response => {
      this.member = response;
      const objectURL = 'data:image/png;base64,' + this.member.picture;
      this.imageUrl = objectURL;
    });
  }

}
