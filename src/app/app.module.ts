import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamSelectComponent } from './components/team-select/team-select.component';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecentResultsComponent } from './components/recent-results/recent-results.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { GenerateBanterComponent } from './components/generate-banter/generate-banter.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    TeamSelectComponent,
    RecentResultsComponent,
    GenerateBanterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    NgbModule,
    MatExpansionModule,
    MatTabsModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
