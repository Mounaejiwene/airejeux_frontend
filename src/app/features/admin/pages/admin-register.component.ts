import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserDto } from '../../../shared/models/user.dto';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="wrap">
    <div class="card">
      <h2>Inscription Administrateur</h2>
      <p class="subtitle">Créer un compte administrateur pour accéder au panel d'administration</p>
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        <div class="form-group">
          <label for="username">Username *</label>
          <input id="username" [(ngModel)]="form.username" name="username" required #username="ngModel" />
          <div class="error" *ngIf="username.invalid && username.touched">Username requis</div>
        </div>

        <div class="form-group">
          <label for="password">Mot de passe *</label>
          <input id="password" type="password" [(ngModel)]="form.password" name="password" required #password="ngModel" />
          <div class="error" *ngIf="password.invalid && password.touched">Mot de passe requis</div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="prenom">Prénom</label>
            <input id="prenom" [(ngModel)]="form.prenom" name="prenom" />
          </div>
          <div class="form-group">
            <label for="nom">Nom</label>
            <input id="nom" [(ngModel)]="form.nom" name="nom" />
          </div>
        </div>

        <div class="form-group">
          <label for="mail">Email</label>
          <input id="mail" type="email" [(ngModel)]="form.mail" name="mail" />
        </div>

        <div class="error" *ngIf="errorMessage">{{ errorMessage }}</div>

        <div class="actions">
          <button type="button" class="btn-secondary" routerLink="/login" [disabled]="loading">Annuler</button>
          <button type="submit" class="btn-primary" [disabled]="f.invalid || loading">
            {{ loading ? 'Inscription...' : 'S\'inscrire' }}
          </button>
        </div>
      </form>
      <p class="footer-link">
        <a routerLink="/login">Retour à la connexion</a> | 
        <a routerLink="/register">Inscription utilisateur</a>
      </p>
    </div>
  </div>
  `,
  styles: [`
    .wrap { max-width: 600px; margin: 40px auto; padding: 0 24px; }
    .card { background: white; border: 1px solid #e0e0e0; border-radius: 12px; padding: 32px; }
    h2 { margin: 0 0 8px; color: #2c3e50; }
    .subtitle { margin: 0 0 24px; color: #7f8c8d; font-size: 0.9rem; }
    
    .form-group { margin-bottom: 16px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    label { display: block; margin-bottom: 6px; font-weight: 500; color: #2c3e50; font-size: 0.9rem; }
    input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
    input:focus { outline: none; border-color: #667eea; }
    
    .error { color: #e74c3c; font-size: 0.85rem; margin-top: 4px; }
    
    .actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
    .btn-primary { padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; }
    .btn-primary:hover:not(:disabled) { background: #5568d3; }
    .btn-primary:disabled { background: #95a5a6; cursor: not-allowed; }
    .btn-secondary { padding: 10px 20px; background: #ecf0f1; color: #2c3e50; border: none; border-radius: 6px; cursor: pointer; }
    .btn-secondary:hover:not(:disabled) { background: #d5dbdb; }
    .btn-secondary:disabled { background: #95a5a6; cursor: not-allowed; }
    
    .footer-link { text-align: center; margin-top: 16px; font-size: 0.9rem; }
    .footer-link a { color: #667eea; text-decoration: none; }
    .footer-link a:hover { text-decoration: underline; }
  `]
})
export class AdminRegisterComponent {
  form: UserDto = { username: '', password: '', nom: '', prenom: '', mail: '', role: 'ADMIN' };
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    
    this.authService.register(this.form).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Une erreur est survenue lors de l\'inscription';
        console.error('Erreur inscription admin:', err);
      }
    });
  }
}
    });
  }
}
