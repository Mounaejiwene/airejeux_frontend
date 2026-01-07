import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { JeuxListComponent } from './jeux/jeux-list.component';
import { NewReservationComponent } from './reservations/new-reservation.component';
import { MyReservationsComponent } from './reservations/my-reservations.component';
import { roleGuard } from './core/role.guard';
import { AdminDashboardComponent } from './admin/dashboard.component';
import { AdminReservationsComponent } from './admin/admin-reservations.component';
import { AdminJeuxComponent } from './admin/admin-jeux.component';
import { AdminUsersComponent } from './admin/admin-users.component';

export const routes: Routes = [
  { path: 'api/**', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'jeux', component: JeuxListComponent, canActivate: [authGuard] },
  { path: 'reservations/new', component: NewReservationComponent, canActivate: [authGuard] },
  { path: 'reservations/mine', component: MyReservationsComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/reservations', component: AdminReservationsComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/jeux', component: AdminJeuxComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN'] } },
  { path: '', pathMatch: 'full', redirectTo: 'jeux' },
  { path: '**', redirectTo: 'jeux' }
];
