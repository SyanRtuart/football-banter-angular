import { AccountComponent } from './components/account/account.component';
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
  { path: '', component: DefaultComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
      { path: 'team-select', component: TeamSelectComponent,  canActivate: [AuthGuardService]},
      { path: 'recent-results/:id', component: RecentMatchesComponent, canActivate: [AuthGuardService] },
      { path: 'match-banter/:id', component: MatchBanterComponent , canActivate: [AuthGuardService]},

      { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
