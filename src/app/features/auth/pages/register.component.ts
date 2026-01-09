import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserDto } from '../../../shared/models/user.dto';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="w-full max-w-md mx-auto my-8 bg-white rounded-xl shadow-md p-6">
    <h2>Inscription</h2>
    <form (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>Username</label>
        <input [(ngModel)]="form.username" name="username" placeholder="Username" required />
      </div>
      <div class="form-group">
        <label>Mot de passe</label>
        <input [(ngModel)]="form.password" name="password" placeholder="Mot de passe" type="password" required />
      </div>
      <div class="form-group">
        <label>Nom</label>
        <input [(ngModel)]="form.nom" name="nom" placeholder="Nom" />
      </div>
      <div class="form-group">
        <label>Prénom</label>
        <input [(ngModel)]="form.prenom" name="prenom" placeholder="Prénom" />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input [(ngModel)]="form.mail" name="mail" placeholder="Email" />
      </div>
      <button type="submit">Créer un compte</button>
    </form>
    <p><a routerLink="/login">Déjà un compte ? Se connecter</a></p>
  </div>
  `,
  styles: [`
    .form-group{margin-bottom:16px}
    label{display:block;margin-bottom:6px;font-weight:500;color:#333}
    input{width:100%;padding:10px;border:1px solid #ddd;border-radius:4px;font-size:14px;box-sizing:border-box}
    input:focus{outline:none;border-color:#3498db}
    button{width:100%;padding:12px;background:#3498db;color:white;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;margin-top:8px}
    button:hover{background:#2980b9}
    p{text-align:center;margin-top:16px}
    a{color:#3498db;text-decoration:none}
    a:hover{text-decoration:underline}
  `]
})
export class RegisterComponent {
  form: UserDto = { username: '', password: '', nom: '', prenom: '', mail: '', role: 'ROLE_USER' };
  loading = false;
  constructor(private auth: AuthService, private router: Router, private toast: ToastService) {}
  onSubmit() {
    this.loading = true;
    this.auth.register(this.form).subscribe({
      next: () => {
        this.toast.success('Compte créé avec succès ! Connectez-vous.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        const msg = err.error?.message || 'Erreur lors de l\'inscription';
        this.toast.error(msg);
      },
    });
  }
}
