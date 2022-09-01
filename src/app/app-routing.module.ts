import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

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
    path: 'clients',component: ClientsComponent,
  },{
    path: 'drivers',component: DriversComponent,
  },{
    path: 'profile',component: LoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
