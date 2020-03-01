import { TeamSelectComponent } from './components/team-select/team-select.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentResultsComponent } from './components/recent-results/recent-results.component';
import { GenerateBanterComponent } from './components/generate-banter/generate-banter.component';


const routes: Routes = [
  { path: '', component: TeamSelectComponent},
  { path: 'recent-results', component: RecentResultsComponent},
  { path: 'generate-banter', component: GenerateBanterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
