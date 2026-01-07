import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="wrap">
    <h2>Gestion des utilisateurs (Admin)</h2>
    <p>Placeholder UI: liste des utilisateurs, édition, suppression.</p>
  </div>
  `,
  styles: [`.wrap{max-width:900px;margin:20px auto;padding:0 16px}`]
})
export class AdminUsersComponent {}
