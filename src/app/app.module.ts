import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamSelectComponent } from './components/team-select/team-select.component';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecentMatchesComponent } from './components/recent-matches/recent-matches.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatchBanterComponent } from './components/match-banter/match-banter.component';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { CreateBanterComponent } from './components/create-banter/create-banter.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UpvoteButtonComponent } from './components/upvote-button/upvote-button.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamSelectComponent,
    RecentMatchesComponent,
    MatchBanterComponent,
    CreateBanterComponent,
    UpvoteButtonComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    NgbModule,
    MatExpansionModule,
    MatTabsModule,
    HttpClientModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    FontAwesomeModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
