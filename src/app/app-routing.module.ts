import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TeamSelectComponent } from './components/team-select/team-select.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DefaultComponent } from './layouts/default/default.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentMatchesComponent } from './components/recent-matches/recent-matches.component';
import { MatchBanterComponent } from './components/match-banter/match-banter.component';


const routes: Routes = [
  { path: '', component: DefaultComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent,  },
      { path: 'team-select', component: TeamSelectComponent,  },
      { path: 'recent-results/:id', component: RecentMatchesComponent },
      { path: 'match-banter/:id', component: MatchBanterComponent },
    ]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
