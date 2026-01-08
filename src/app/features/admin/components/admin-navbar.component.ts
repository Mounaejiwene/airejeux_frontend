import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <nav class="bg-white shadow-md border-b border-gray-100 sticky top-0 z-[1000]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
          
          <div class="flex items-center gap-3 cursor-pointer" routerLink="/admin">
            <div class="bg-indigo-600 p-2 rounded-lg shadow-indigo-200 shadow-lg">
              <mat-icon class="text-white">admin_panel_settings</mat-icon>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-900 text-lg font-bold leading-none">Admin</span>
              <span class="text-indigo-600 text-xs font-black uppercase tracking-widest">AireJeux</span>
            </div>
          </div>

          <div class="hidden lg:flex items-center space-x-1">
            <a routerLink="/admin" [routerLinkActive]="'active-link'" [routerLinkActiveOptions]="{exact:true}"
               class="nav-item">
              <mat-icon>dashboard</mat-icon>
              <span>Dashboard</span>
            </a>

            <a routerLink="/admin/jeux" routerLinkActive="active-link" class="nav-item">
              <mat-icon>sports_esports</mat-icon>
              <span>Jeux</span>
            </a>

            <a routerLink="/admin/reservations" routerLinkActive="active-link" class="nav-item">
              <mat-icon>event</mat-icon>
              <span>Réservations</span>
            </a>

            <a routerLink="/admin/register" routerLinkActive="active-link" class="nav-item">
              <mat-icon>person_add</mat-icon>
              <span>Créer un compte</span>
            </a>
          </div>

          <div class="flex items-center gap-4">
            <button routerLink="/jeux" 
                    class="hidden md:flex items-center gap-2 px-4 py-2 border border-indigo-100 text-indigo-600 hover:bg-indigo-50 rounded-xl text-sm font-bold transition-all">
              <mat-icon class="scale-90">visibility</mat-icon>
              Vue utilisateur
            </button>

            <div class="h-8 w-px bg-gray-100 mx-1"></div>

            <button (click)="logout()" 
                    class="flex items-center gap-2 text-gray-400 hover:text-red-500 p-2 rounded-lg transition-colors">
              <mat-icon>logout</mat-icon>
            </button>
          </div>

        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-item {
      @apply flex items-center gap-2 text-gray-500 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-indigo-50/50;
    }
    .active-link {
      @apply text-indigo-600 bg-indigo-50 shadow-sm font-bold;
    }
    mat-icon { font-size: 20px; width: 20px; height: 20px; }
  `]
})
export class AdminNavbarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}