import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserDto } from '../../../shared/models/user.dto';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="wrap">
    <div class="header">
      <h2>Gestion des utilisateurs</h2>
      <button class="btn-primary" routerLink="/admin/register">+ Créer un utilisateur</button>
    </div>

    <!-- Liste des utilisateurs -->
    <div class="list" *ngIf="users.length > 0; else empty">
      <div class="card" *ngFor="let user of users">
        <div class="card-content">
          <h3>{{ user.username }}</h3>
          <p class="user-info">
            <span>{{ user.prenom }} {{ user.nom }}</span>
            <span class="email">{{ user.mail }}</span>
          </p>
          <span class="badge" [class.admin]="isAdmin(user.role)">
            {{ getRoleDisplay(user.role) }}
          </span>
        </div>
        <div class="actions">
          <button class="btn-edit" (click)="openEditForm(user)" [disabled]="loading">✏️ Éditer</button>
          <button class="btn-delete" (click)="deleteUser(user)" [disabled]="loading">🗑️ Supprimer</button>
        </div>
      </div>
    </div>
    <ng-template #empty>
      <p class="empty-state">Aucun utilisateur trouvé.</p>
    </ng-template>

    <!-- Formulaire modal -->
    <div class="modal" *ngIf="showForm" (click)="closeForm()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ isEditMode ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur' }}</h3>
          <button class="btn-close" (click)="closeForm()">✕</button>
        </div>
        <form (ngSubmit)="saveUser()" #form="ngForm">
          <div class="form-group">
            <label for="username">Username *</label>
            <input type="text" id="username" name="username" [(ngModel)]="currentUser.username" required #usernameInput="ngModel">
            <div class="error" *ngIf="usernameInput.invalid && usernameInput.touched">Le username est requis</div>
          </div>

          <div class="form-group">
            <label for="password">Mot de passe {{ isEditMode ? '(laisser vide pour ne pas changer)' : '*' }}</label>
            <input type="password" id="password" name="password" [(ngModel)]="currentUser.password" [required]="!isEditMode" #passwordInput="ngModel">
            <div class="error" *ngIf="passwordInput.invalid && passwordInput.touched">Le mot de passe est requis</div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="prenom">Prénom</label>
              <input type="text" id="prenom" name="prenom" [(ngModel)]="currentUser.prenom">
            </div>
            <div class="form-group">
              <label for="nom">Nom</label>
              <input type="text" id="nom" name="nom" [(ngModel)]="currentUser.nom">
            </div>
          </div>

          <div class="form-group">
            <label for="mail">Email</label>
            <input type="email" id="mail" name="mail" [(ngModel)]="currentUser.mail">
          </div>

          <div class="form-group">
            <label for="role">Rôle *</label>
            <select id="role" name="role" [(ngModel)]="currentUser.role" required #roleInput="ngModel">
              <option value="USER">Utilisateur</option>
              <option value="ADMIN">Administrateur</option>
            </select>
            <div class="error" *ngIf="roleInput.invalid && roleInput.touched">Le rôle est requis</div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-secondary" (click)="closeForm()" [disabled]="loading">Annuler</button>
            <button type="submit" class="btn-primary" [disabled]="form.invalid || loading">
              {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>

          <div class="error" *ngIf="errorMessage">{{ errorMessage }}</div>
        </form>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .wrap { max-width: 1200px; margin: 40px auto; padding: 0 24px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    h2 { margin: 0; color: #2c3e50; font-size: 2rem; }
    .btn-primary { padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; transition: background 0.2s; }
    .btn-primary:hover:not(:disabled) { background: #5568d3; }
    .btn-primary:disabled { background: #95a5a6; cursor: not-allowed; }

    .list { display: grid; gap: 16px; }
    .card { background: white; border: 1px solid #e0e0e0; border-radius: 12px; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
    .card-content h3 { margin: 0 0 8px; color: #2c3e50; font-size: 1.3rem; }
    .user-info { margin: 8px 0; color: #7f8c8d; display: flex; flex-direction: column; gap: 4px; }
    .email { font-size: 0.9rem; color: #95a5a6; }

    .badge { display: inline-block; padding: 4px 12px; background: #ecf0f1; color: #7f8c8d; border-radius: 12px; font-size: 0.85rem; font-weight: 500; margin-top: 8px; }
    .badge.admin { background: #fee; color: #e74c3c; }

    .actions { display: flex; gap: 8px; }
    .btn-edit { padding: 8px 16px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; }
    .btn-edit:hover:not(:disabled) { background: #2980b9; }
    .btn-delete { padding: 8px 16px; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; }
    .btn-delete:hover:not(:disabled) { background: #c0392b; }
    .btn-edit:disabled, .btn-delete:disabled { background: #95a5a6; cursor: not-allowed; }

    .empty-state { text-align: center; color: #7f8c8d; padding: 40px; }

    .modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: white; border-radius: 12px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
    .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid #e0e0e0; }
    .modal-header h3 { margin: 0; }
    .btn-close { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #7f8c8d; }
    .btn-close:hover { color: #2c3e50; }

    form { padding: 20px; }
    .form-group { margin-bottom: 16px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    label { display: block; margin-bottom: 6px; font-weight: 500; color: #2c3e50; font-size: 0.9rem; }
    input, select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
    input:focus, select:focus { outline: none; border-color: #667eea; }

    .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
    .btn-secondary { padding: 10px 20px; background: #ecf0f1; color: #2c3e50; border: none; border-radius: 6px; cursor: pointer; }
    .btn-secondary:hover:not(:disabled) { background: #d5dbdb; }

    .error { color: #e74c3c; font-size: 0.85rem; margin-top: 4px; }
  `]
})
export class AdminUsersComponent implements OnInit {
  users: UserDto[] = [];
  showForm = false;
  isEditMode = false;
  loading = false;
  errorMessage = '';
  currentUser: UserDto = this.getEmptyUser();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Erreur lors du chargement des utilisateurs:', err)
    });
  }

  openCreateForm() {
    this.isEditMode = false;
    this.currentUser = this.getEmptyUser();
    this.showForm = true;
    this.errorMessage = '';
  }

  openEditForm(user: UserDto) {
    this.isEditMode = true;
    this.currentUser = { ...user, password: '' };
    this.showForm = true;
    this.errorMessage = '';
  }

  closeForm() {
    this.showForm = false;
    this.currentUser = this.getEmptyUser();
    this.errorMessage = '';
  }

  saveUser() {
    this.loading = true;
    this.errorMessage = '';

    if (this.isEditMode) {
      this.userService.updateUser(this.currentUser.id!, this.currentUser).subscribe({
        next: () => {
          this.loading = false;
          this.closeForm();
          this.loadUsers();
        },
        error: (err: any) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Une erreur est survenue';
          console.error('Erreur lors de l\'enregistrement:', err);
        }
      });
    } else {
      this.userService.createUser(this.currentUser).subscribe({
        next: () => {
          this.loading = false;
          this.closeForm();
          this.loadUsers();
        },
        error: (err: any) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Une erreur est survenue';
          console.error('Erreur lors de l\'enregistrement:', err);
        }
      });
    }
  }

  deleteUser(user: UserDto) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${user.username}" ?`)) {
      return;
    }

    this.loading = true;
    this.userService.deleteUser(user.id!).subscribe({
      next: () => {
        this.loading = false;
        this.loadUsers();
      },
      error: (err) => {
        this.loading = false;
        alert('Erreur lors de la suppression: ' + (err.error?.message || err.message));
        console.error('Erreur lors de la suppression:', err);
      }
    });
  }

  isAdmin(role: string | undefined): boolean {
    return role === 'ADMIN' || role === 'ROLE_ADMIN';
  }

  getRoleDisplay(role: string | undefined): string {
    if (!role) return 'Utilisateur';
    return this.isAdmin(role) ? 'Administrateur' : 'Utilisateur';
  }

  private getEmptyUser(): UserDto {
    return {
      username: '',
      password: '',
      nom: '',
      prenom: '',
      mail: '',
      role: 'USER'
    };
  }
}
