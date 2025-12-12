import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="container">
    <h2>Connexion</h2>
    <form (ngSubmit)="onSubmit()">
      <label>Username</label>
      <input [(ngModel)]="username" name="username" required />
      <label>Mot de passe</label>
      <input [(ngModel)]="password" name="password" type="password" required />
      <button type="submit">Se connecter</button>
    </form>
    <p><a routerLink="/register">Créer un compte</a></p>
  </div>
  `,
  styles: [`.container{max-width:380px;margin:40px auto;display:flex;flex-direction:column;gap:12px}`]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.username || !this.password) return;
    this.loading = true;
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/jeux']),
      error: () => this.loading = false,
    });
  }
}
