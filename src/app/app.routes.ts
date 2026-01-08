import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { LoginComponent } from './features/auth/pages/login.component';
import { RegisterComponent } from './features/auth/pages/register.component';
import { JeuxListComponent } from './features/jeux/pages/jeux-list.component';
import { NewReservationComponent } from './features/reservations/pages/new-reservation.component';
import { MyReservationsComponent } from './features/reservations/pages/my-reservations.component';
import { AdminLayoutComponent } from './features/admin/layouts/admin-layout.component';
import { AdminDashboardComponent } from './features/admin/pages/dashboard.component';
import { AdminReservationsComponent } from './features/admin/pages/admin-reservations.component';
import { AdminJeuxComponent } from './features/admin/pages/admin-jeux.component';
import { AdminRegisterComponent } from './features/admin/pages/admin-register.component';

export const routes: Routes = [
  { path: 'api/**', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'jeux', component: JeuxListComponent, canActivate: [authGuard] },
  { path: 'reservations/new', component: NewReservationComponent, canActivate: [authGuard] },
  { path: 'reservations/mine', component: MyReservationsComponent, canActivate: [authGuard] },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'jeux', component: AdminJeuxComponent },
      { path: 'reservations', component: AdminReservationsComponent },
      { path: 'register', component: AdminRegisterComponent }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];
