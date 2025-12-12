import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'airejeux_frontend';
  constructor(public auth: AuthService, private router: Router) {}
  get isAuth() { return this.auth.isAuthenticated(); }
  get role() { return this.auth.getRole(); }
  logout() { this.auth.logout(); this.router.navigate(['/login']); }
}
