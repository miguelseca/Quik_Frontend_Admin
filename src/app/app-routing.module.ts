import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './components/clients/clients.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { IssuesComponent } from './components/issues/issues.component';
import { EditDriverComponent } from './components/edit-driver/edit-driver.component';
import { NewDriverComponent } from './components/new-driver/new-driver.component';
import { AuthGuard } from './services/auth.guard';
import { LoginAdminComponent } from './components/login/login.component';
import { MapsComponent } from './components/maps/maps.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginAdminComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'drivers', component: DriversComponent, canActivate: [AuthGuard] },
  { path: 'newDriver', component: NewDriverComponent, canActivate: [AuthGuard] },
  { path: 'editDriver', component: EditDriverComponent, canActivate: [AuthGuard] },
  { path: 'issues', component: IssuesComponent, canActivate: [AuthGuard] },
  { path: 'maps', component: MapsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
