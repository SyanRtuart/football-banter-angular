import { TeamSelectComponent } from './components/team-select/team-select.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentMatchesComponent } from './components/recent-matches/recent-matches.component';
import { MatchBanterComponent } from './components/match-banter/match-banter.component';


const routes: Routes = [
  { path: '', component: TeamSelectComponent},
  { path: 'recent-results/:id', component: RecentMatchesComponent},
  { path: 'match-banter/:id', component: MatchBanterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
