import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { IssuesComponent } from './components/issues/issues.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '', redirectTo:'/login',
    pathMatch: 'full',
  },
  {
    path: 'login',component: LoginPageComponent,
  },{
    path: 'dashboard',component: DashboardComponent,canActivate:[AuthGuardService]
  },{
    path: 'chart-Users',component: LoginPageComponent,canActivate:[AuthGuardService]
  },{
    path: 'chart-Revenue',component: LoginPageComponent,canActivate:[AuthGuardService]
  },{
    path: 'chart-Drivers',component: LoginPageComponent,canActivate:[AuthGuardService]
  },{
    path: 'issues',component: IssuesComponent,canActivate:[AuthGuardService]
  },{
    path: 'clients',component: ClientsComponent,canActivate:[AuthGuardService]
  },{
    path: 'drivers',component: DriversComponent,canActivate:[AuthGuardService]
  },{
    path: 'profile',component: LoginPageComponent,canActivate:[AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
