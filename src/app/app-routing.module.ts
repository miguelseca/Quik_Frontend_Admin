import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: '', redirectTo:'/login',
    pathMatch: 'full',
  },
  {
    path: 'login',component: LoginPageComponent,
  },{
    path: 'dashboard',component: DashboardComponent,
  },{
    path: 'chart-Users',component: LoginPageComponent,
  },{
    path: 'chart-Revenue',component: LoginPageComponent,
  },{
    path: 'chart-Drivers',component: LoginPageComponent,
  },{
    path: 'issues',component: LoginPageComponent,
  },{
    path: 'clients',component: LoginPageComponent,
  },{
    path: 'drivers',component: LoginPageComponent,
  },{
    path: 'profile',component: LoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
