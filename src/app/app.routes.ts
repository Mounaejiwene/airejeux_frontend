import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { LoginComponent } from './features/auth/pages/login.component';
import { RegisterComponent } from './features/auth/pages/register.component';
import { JeuxListComponent } from './features/jeux/pages/jeux-list.component';
import { NewReservationComponent } from './features/reservations/pages/new-reservation.component';
import { MyReservationsComponent } from './features/reservations/pages/my-reservations.component';
import { AdminDashboardComponent } from './features/admin/pages/dashboard.component';
import { AdminReservationsComponent } from './features/admin/pages/admin-reservations.component';
import { AdminJeuxComponent } from './features/admin/pages/admin-jeux.component';
import { AdminUsersComponent } from './features/admin/pages/admin-users.component';

export const routes: Routes = [
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
