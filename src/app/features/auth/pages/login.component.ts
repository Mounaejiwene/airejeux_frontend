import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="w-full max-w-md mx-auto my-8 bg-white rounded-xl shadow-md p-6">
    <h2>Page de Connexion</h2>
    <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
      <div class="form-group">
        <label>Username</label>
        <input [(ngModel)]="username" name="username" required #usernameInput="ngModel" />
        <div class="error" *ngIf="usernameInput.invalid && usernameInput.touched">Username requis</div>
      </div>
      <div class="form-group">
        <label>Mot de passe</label>
        <input [(ngModel)]="password" name="password" type="password" required #passwordInput="ngModel" />
        <div class="error" *ngIf="passwordInput.invalid && passwordInput.touched">Mot de passe requis</div>
      </div>
      <button type="submit" [disabled]="loading || loginForm.invalid">
        {{ loading ? 'Connexion...' : 'Se connecter' }}
      </button>
      <div class="error" *ngIf="errorMessage">{{ errorMessage }}</div>
      <div class="success" *ngIf="successMessage">{{ successMessage }}</div>
    </form>
    <p><a routerLink="/register">Créer un compte</a></p>
  </div>
  `,
  styles: [`
    
    .form-group{margin-bottom:16px}
    label{display:block;margin-bottom:6px;font-weight:500;color:#333}
    input{width:100%;padding:10px;border:1px solid #ddd;border-radius:4px;font-size:14px;box-sizing:border-box}
    input:focus{outline:none;border-color:#3498db}
    button{width:100%;padding:12px;background:#3498db;color:white;border:none;border-radius:4px;font-size:16px;font-weight:500;cursor:pointer;margin-top:8px}
    button:hover:not(:disabled){background:#2980b9}
    button:disabled{background:#95a5a6;cursor:not-allowed}
    .error{color:#e74c3c;font-size:12px;margin-top:4px}
    .success{color:#27ae60;font-size:12px;margin-top:4px;padding:8px;background:#d5f4e6;border-radius:4px}
    p{text-align:center;margin-top:16px}
    a{color:#3498db;text-decoration:none}
    a:hover{text-decoration:underline}
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private auth: AuthService, private router: Router, private toast: ToastService) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    console.log('Tentative de connexion avec:', this.username);

    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (token) => {
        console.log('✅ Connexion réussie, token reçu');
        this.loading = false;
        this.successMessage = 'Connexion réussie ! Redirection...';
        this.toast.success('Connexion réussie !');

        setTimeout(() => {
          const isAdmin = this.auth.isAdmin();
          console.log('Est admin ?', isAdmin);
          const destination = isAdmin ? '/admin' : '/jeux';
          console.log('Redirection vers:', destination);
          this.router.navigate([destination]);
        }, 500);
      },
      error: (err) => {
        console.error('❌ Erreur de connexion:', err);
        this.loading = false;
        const msg = err.error?.message || 'Identifiants incorrects';
        this.errorMessage = msg;
        this.toast.error(msg);
      },
    });
  }
}
