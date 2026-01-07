import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from '../components/admin-navbar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, AdminNavbarComponent],
  template: `
    <app-admin-navbar></app-admin-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      flex: 1;
      background: #f5f7fa;
    }
  `]
})
export class AdminLayoutComponent {}
