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
  <div class="container">
    <h2>Inscription</h2>
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="form.username" name="username" placeholder="Username" required />
      <input [(ngModel)]="form.password" name="password" placeholder="Mot de passe" type="password" required />
      <input [(ngModel)]="form.nom" name="nom" placeholder="Nom" />
      <input [(ngModel)]="form.prenom" name="prenom" placeholder="Prénom" />
      <input [(ngModel)]="form.mail" name="mail" placeholder="Email" />
      <button type="submit">Créer un compte</button>
    </form>
    <p><a routerLink="/login">Déjà un compte ? Se connecter</a></p>
  </div>
  `,
  styles: [`.container{max-width:420px;margin:40px auto;display:flex;flex-direction:column;gap:12px}`]
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
