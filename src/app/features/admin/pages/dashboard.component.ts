import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="wrap">
    <h2>Admin - Tableau de bord</h2>
    <nav class="nav">
      <a routerLink="/admin/reservations">Réservations en attente</a>
      <a routerLink="/admin/jeux">Gestion des jeux</a>
      <a routerLink="/admin/users">Gestion des utilisateurs</a>
    </nav>
  </div>
  `,
  styles: [
    `.wrap{max-width:900px;margin:20px auto;padding:0 16px}`,
    `.nav{display:flex;gap:12px;flex-wrap:wrap}`,
    `.nav a{padding:8px 12px;border:1px solid #ddd;border-radius:10px;text-decoration:none}`
  ]
})
export class AdminDashboardComponent {}
