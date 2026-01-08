import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './core/services/auth.service';
import { filter } from 'rxjs';
// Chemin exact basé sur votre capture d'écran
import { AdminNavbarComponent } from './features/admin/components/admin-navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, MatIconModule, AdminNavbarComponent],
  template: `
    <app-admin-navbar *ngIf="isAdminRoute && !isAuthPage"></app-admin-navbar>

    <nav *ngIf="!isAdminRoute && !isAuthPage && isAuth" 
         class="bg-white shadow-md border-b border-gray-100 sticky top-0 z-[1000]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
          
          <div class="flex items-center gap-3 cursor-pointer" routerLink="/jeux">
            <div class="bg-[#3498db] p-2 rounded-lg shadow-lg">
              <mat-icon class="text-white">sports_esports</mat-icon>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-900 text-lg font-bold leading-none">AireJeux</span>
              <span class="text-[#3498db] text-xs font-black uppercase tracking-widest">Client</span>
            </div>
          </div>

          <div class="hidden lg:flex items-center space-x-2">
            <a routerLink="/jeux" [routerLinkActive]="'active-link'" 
               class="nav-item-user">
              <mat-icon>grid_view</mat-icon>
              <span>Catalogue</span>
            </a>

            <a routerLink="/reservations/mine" routerLinkActive="active-link" 
               class="nav-item-user">
              <mat-icon>history</mat-icon>
              <span>Mes Réservations</span>
            </a>
          </div>

          <div class="flex items-center gap-4">
            <button *ngIf="role === 'ADMIN'" routerLink="/admin" 
                    class="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-xs font-bold transition-all">
              <mat-icon class="scale-75">admin_panel_settings</mat-icon>
              DASHBOARD
            </button>

            <div class="h-8 w-px bg-gray-200 mx-1"></div>

            <div class="flex items-center gap-3">
              <div class="hidden sm:flex flex-col items-end">
                <span class="text-gray-900 text-sm font-bold">{{ username }}</span>
                <span class="text-gray-400 text-[10px] uppercase">{{ role }}</span>
              </div>
              <button (click)="logout()" 
                      class="text-gray-400 hover:text-red-500 p-2 rounded-lg transition-colors">
                <mat-icon>logout</mat-icon>
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>

    <main class="min-h-screen" [class.bg-gray-50]="!isAdminRoute">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .nav-item-user {
      @apply flex items-center gap-2 text-gray-500 hover:text-[#3498db] px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-gray-50;
    }
    .active-link {
      @apply text-[#3498db] bg-[#3498db]/5;
    }
    mat-icon { font-size: 20px; width: 20px; height: 20px; }
  `]
})
export class AppComponent {
  isAdminRoute = false;
  isAuthPage = false;
  menuOpen = false;

  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || event.url;
      // Détection de l'espace admin
      this.isAdminRoute = url.startsWith('/admin');
      // Détection des pages d'authentification pour masquer toute navbar
      this.isAuthPage = url.includes('/login') || url.includes('/register');
      this.closeMenu();
    });
  }

  get isAuth() { return this.auth.isAuthenticated(); }
  get role() { return this.auth.getRole(); }
  get username() { return this.auth.getUsername(); }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu() { this.menuOpen = false; }
}