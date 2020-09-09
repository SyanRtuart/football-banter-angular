import { JwtTokenService } from './../../../services/jwt-token.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/services/user/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: User;
  imageUrl: any;


  constructor(private userService: UserService, private tokenService: JwtTokenService) { }

  ngOnInit(): void {
    this.userService.getUser(this.tokenService.getEmail()).subscribe(response => {
      this.user = response;
      const objectURL = 'data:image/png;base64,' + this.user.picture;
      this.imageUrl = objectURL;
    })
  }

}
