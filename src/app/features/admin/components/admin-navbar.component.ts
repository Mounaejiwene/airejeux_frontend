import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <nav class="admin-nav">
    <div class="nav-container">
      <div class="nav-brand">
        <a routerLink="/admin" class="logo">
          Admin - Aire de Jeux Tours
        </a>
      </div>

      <div class="nav-menu">
        <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
          Dashboard
        </a>
        <a routerLink="/admin/jeux" routerLinkActive="active" class="nav-link">
          Jeux
        </a>
        <a routerLink="/admin/reservations" routerLinkActive="active" class="nav-link">
          Réservations
        </a>
        <a routerLink="/admin/users" routerLinkActive="active" class="nav-link">
          Utilisateurs
        </a>
      </div>

      <div class="nav-actions">
        <a routerLink="/jeux" class="nav-link user-view">
          Vue utilisateur
        </a>
        <span class="username">{{ username }}</span>
        <button class="btn-logout" (click)="logout()">
          Déconnexion
        </button>
      </div>
    </div>
  </nav>
  `,
  styles: [`
    .admin-nav {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      gap: 32px;
      min-height: 64px;
    }

    .nav-brand .logo {
      font-size: 1.2rem;
      font-weight: bold;
      color: white;
      text-decoration: none;
      white-space: nowrap;
    }

    .nav-menu {
      display: flex;
      gap: 8px;
      flex: 1;
    }

    .nav-link {
      color: rgba(255,255,255,0.9);
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 0.95rem;
      white-space: nowrap;
      transition: background 0.2s;
    }

    .nav-link:hover {
      background: rgba(255,255,255,0.15);
    }

    .nav-link.active {
      background: rgba(255,255,255,0.25);
      font-weight: 500;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .nav-link.user-view {
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.3);
    }

    .username {
      color: white;
      font-size: 0.9rem;
      padding: 6px 12px;
      background: rgba(255,255,255,0.15);
      border-radius: 6px;
    }

    .btn-logout {
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.4);
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background 0.2s;
    }

    .btn-logout:hover {
      background: rgba(255,255,255,0.3);
    }

    @media (max-width: 768px) {
      .nav-container {
        flex-wrap: wrap;
        gap: 12px;
      }

      .nav-menu {
        order: 3;
        width: 100%;
        justify-content: space-around;
      }

      .username {
        display: none;
      }
    }
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
