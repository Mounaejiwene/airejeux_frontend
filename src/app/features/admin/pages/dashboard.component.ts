import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="wrap">
    <div class="header">
      <div>
        <h1>Tableau de bord Admin</h1>
        <p class="subtitle">Bienvenue, {{ username }} 👋</p>
      </div>
    </div>

    <div class="cards">
      <a routerLink="/admin/jeux" class="card jeux">
        <div class="icon">🎮</div>
        <h3>Gestion des jeux</h3>
        <p>Créer, modifier et supprimer les équipements de jeux</p>
        <span class="arrow">→</span>
      </a>

      <a routerLink="/admin/reservations" class="card reservations">
        <div class="icon">📅</div>
        <h3>Gestion des réservations</h3>
        <p>Approuver ou rejeter les réservations en attente</p>
        <span class="arrow">→</span>
      </a>
    </div>
  </div>
  `,
  styles: [
    `.wrap { max-width: 1200px; margin: 40px auto; padding: 0 24px; }`,
    `.header { margin-bottom: 40px; }`,
    `h1 { margin: 0; color: #2c3e50; font-size: 2rem; }`,
    `.subtitle { margin: 8px 0 0; color: #7f8c8d; font-size: 1.1rem; }`,
    `.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }`,
    `.card { display: flex; flex-direction: column; padding: 32px; background: white; border: 2px solid #e0e0e0; border-radius: 16px; text-decoration: none; cursor: pointer; }`,
    `.card.jeux { border-top: 4px solid #667eea; }`,
    `.card.reservations { border-top: 4px solid #f5576c; }`,
    `.icon { font-size: 3rem; margin-bottom: 16px; }`,
    `.card h3 { margin: 0 0 12px; color: #2c3e50; font-size: 1.4rem; }`,
    `.card p { margin: 0; color: #7f8c8d; line-height: 1.6; flex: 1; }`,
    `.arrow { margin-top: 16px; font-size: 1.5rem; color: #bdc3c7; text-align: right; }`
  ]
})
export class AdminDashboardComponent {
  constructor(public auth: AuthService) {}
  get username() { return this.auth.getUsername() || 'Admin'; }
}
