import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './components/clients/clients.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { IssuesComponent } from './components/issues/issues.component';
import { EditDriverComponent } from './components/edit-driver/edit-driver.component';
import { NewDriverComponent } from './components/new-driver/new-driver.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginAdminComponent } from './components/login/login.component';
import { MapsComponent } from './components/maps/maps.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginAdminComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuardService] },
  { path: 'drivers', component: DriversComponent, canActivate: [AuthGuardService] },
  { path: 'newDriver', component: NewDriverComponent, canActivate: [AuthGuardService] },
  { path: 'editDriver', component: EditDriverComponent, canActivate: [AuthGuardService] },
  { path: 'issues', component: IssuesComponent, canActivate: [AuthGuardService] },
  { path: 'maps', component: MapsComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
