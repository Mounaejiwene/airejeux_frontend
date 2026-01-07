import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
  <mat-toolbar color="primary" class="admin-toolbar">
    <span class="brand" routerLink="/admin">Admin - AireJeux</span>
    <span class="spacer"></span>
    <nav class="links">
      <button mat-button class="nav-btn" routerLink="/admin" [routerLinkActive]="'active'" [routerLinkActiveOptions]="{exact:true}"><mat-icon>dashboard</mat-icon><span>Dashboard</span></button>
      <button mat-button class="nav-btn" routerLink="/admin/jeux" routerLinkActive="active"><mat-icon>sports_esports</mat-icon><span>Jeux</span></button>
      <button mat-button class="nav-btn" routerLink="/admin/reservations" routerLinkActive="active"><mat-icon>event</mat-icon><span>Réservations</span></button>
      <button mat-button class="nav-btn" routerLink="/admin/users" routerLinkActive="active"><mat-icon>group</mat-icon><span>Utilisateurs</span></button>
      <button mat-stroked-button class="nav-btn" color="accent" routerLink="/jeux"><mat-icon>visibility</mat-icon><span>Vue utilisateur</span></button>
      <button mat-button class="nav-btn" (click)="logout()"><mat-icon>logout</mat-icon><span>Déconnexion</span></button>
    </nav>
  </mat-toolbar>
  `,
  styles: [`
    .admin-toolbar { position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    .brand { font-weight: 700; letter-spacing: .4px; cursor: pointer; }
    .spacer { flex: 1 1 auto; }
    .links { display: flex; align-items: center; gap: 4px; }
    .nav-btn { display: inline-flex; align-items: center; gap: 6px; border-radius: 20px; padding: 0 10px; }
    .nav-btn.active { background-color: rgba(255,255,255,0.18); }
    .welcome { margin: 0 8px; opacity: .9; }
  `]
})
export class AdminNavbarComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  get username(): string {
    return this.auth.getUsername() || 'Admin';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
