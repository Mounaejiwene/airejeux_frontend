import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JeuxService } from '../../jeux/services/jeux.service';
import { JeuxRequestDto, JeuxResponseDto } from '../../../shared/models/jeux.dto';

@Component({
  selector: 'app-admin-jeux',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="wrap">
    <div class="header">
      <h2>Gestion des jeux</h2>
      <button class="btn-primary" (click)="openCreateForm()">+ Ajouter un jeu</button>
    </div>

    <!-- Liste des jeux -->
    <div class="list" *ngIf="jeux.length > 0; else empty">
      <div class="card" *ngFor="let jeu of jeux">
        <div class="card-content">
          <h3>{{ jeu.nom }}</h3>
          <p class="description">{{ jeu.description || 'Aucune description' }}</p>
          <div class="meta">
            <span class="badge">Quantité: {{ jeu.quantite }}</span>
            <span class="coords" *ngIf="jeu.coordonnees">
              📍 {{ jeu.coordonnees.latitude }}, {{ jeu.coordonnees.longitude }}
            </span>
          </div>
        </div>
        <div class="actions">
          <button class="btn-edit" (click)="openEditForm(jeu)" [disabled]="loading">Éditer</button>
          <button class="btn-delete" (click)="deleteJeu(jeu)" [disabled]="loading">🗑️ Supprimer</button>
        </div>
      </div>
    </div>
    <ng-template #empty>
      <p class="empty-state">Aucun jeu disponible. Cliquez sur "Ajouter un jeu" pour commencer.</p>
    </ng-template>

    <!-- Formulaire modal -->
    <div class="modal" *ngIf="showForm" (click)="closeForm()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ isEditMode ? 'Modifier le jeu' : 'Nouveau jeu' }}</h3>
          <button class="btn-close" (click)="closeForm()">✕</button>
        </div>
        <form (ngSubmit)="saveJeu()" #form="ngForm">
          <div class="form-group">
            <label for="nom">Nom du jeu *</label>
            <input type="text" id="nom" name="nom" [(ngModel)]="currentJeu.nom" required #nomInput="ngModel">
            <div class="error" *ngIf="nomInput.invalid && nomInput.touched">Le nom est requis</div>
          </div>

          <div class="form-group">
            <label for="quantite">Quantité *</label>
            <input type="number" id="quantite" name="quantite" [(ngModel)]="currentJeu.quantite" required min="0" #qteInput="ngModel">
            <div class="error" *ngIf="qteInput.invalid && qteInput.touched">La quantité doit être ≥ 0</div>
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" name="description" [(ngModel)]="currentJeu.description" rows="3"></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="latitude">Latitude</label>
              <input type="text" id="latitude" name="latitude" [(ngModel)]="currentJeu.coordonnees!.latitude">
            </div>
            <div class="form-group">
              <label for="longitude">Longitude</label>
              <input type="text" id="longitude" name="longitude" [(ngModel)]="currentJeu.coordonnees!.longitude">
            </div>
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
    .wrap { max-width: 1200px; margin: 20px auto; padding: 0 16px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    h2 { margin: 0; color: #333; }

    /* Liste */
    .list { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
    .card { border: 1px solid #e0e0e0; border-radius: 12px; padding: 16px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; }
    .card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .card-content h3 { margin: 0 0 8px; color: #2c3e50; font-size: 1.25rem; }
    .description { color: #666; font-size: 0.9rem; margin: 8px 0; min-height: 40px; }
    .meta { display: flex; gap: 12px; align-items: center; margin-top: 12px; flex-wrap: wrap; }
    .badge { background: #3498db; color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.85rem; font-weight: 500; }
    .coords { color: #7f8c8d; font-size: 0.85rem; }
    .actions { display: flex; gap: 8px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #ecf0f1; }

    /* Buttons */
    button { border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; font-weight: 500; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-primary { background: #3498db; color: white; }
    .btn-primary:hover:not(:disabled) { background: #2980b9; }
    .btn-secondary { background: #95a5a6; color: white; }
    .btn-secondary:hover:not(:disabled) { background: #7f8c8d; }
    .btn-edit { background: #f39c12; color: white; flex: 1; }
    .btn-edit:hover:not(:disabled) { background: #e67e22; }
    .btn-delete { background: #e74c3c; color: white; flex: 1; }
    .btn-delete:hover:not(:disabled) { background: #c0392b; }
    .btn-close { background: transparent; color: #95a5a6; padding: 4px 8px; font-size: 1.5rem; }
    .btn-close:hover { color: #e74c3c; }

    /* Modal */
    .modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: white; border-radius: 12px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
    .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid #ecf0f1; }
    .modal-header h3 { margin: 0; color: #2c3e50; }
    form { padding: 20px; }
    .form-group { margin-bottom: 16px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    label { display: block; margin-bottom: 6px; color: #555; font-weight: 500; font-size: 0.9rem; }
    input, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; box-sizing: border-box; }
    input:focus, textarea:focus { outline: none; border-color: #3498db; }
    textarea { resize: vertical; font-family: inherit; }
    .modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
    .error { color: #e74c3c; font-size: 0.85rem; margin-top: 8px; }
    .empty-state { text-align: center; padding: 60px 20px; color: #95a5a6; font-size: 1.1rem; }
  `]
})
export class AdminJeuxComponent implements OnInit {
  jeux: JeuxResponseDto[] = [];
  showForm = false;
  isEditMode = false;
  loading = false;
  errorMessage = '';
  currentJeu: JeuxRequestDto = this.getEmptyJeu();

  constructor(private jeuxService: JeuxService) {}

  ngOnInit() {
    this.loadJeux();
  }

  loadJeux() {
    this.jeuxService.getAllJeux().subscribe({
      next: (data) => this.jeux = data,
      error: (err) => console.error('Erreur lors du chargement des jeux:', err)
    });
  }

  openCreateForm() {
    this.isEditMode = false;
    this.currentJeu = this.getEmptyJeu();
    this.showForm = true;
    this.errorMessage = '';
  }

  openEditForm(jeu: JeuxResponseDto) {
    this.isEditMode = true;
    this.currentJeu = {
      ...jeu,
      coordonnees: jeu.coordonnees ? { ...jeu.coordonnees } : { latitude: '0', longitude: '0' }
    };
    this.showForm = true;
    this.errorMessage = '';
  }

  closeForm() {
    this.showForm = false;
    this.currentJeu = this.getEmptyJeu();
    this.errorMessage = '';
  }

  saveJeu() {
    this.loading = true;
    this.errorMessage = '';

    const operation = this.isEditMode
      ? this.jeuxService.updateJeu((this.currentJeu as JeuxResponseDto).id, this.currentJeu)
      : this.jeuxService.createJeu(this.currentJeu);

    operation.subscribe({
      next: () => {
        this.loading = false;
        this.closeForm();
        this.loadJeux();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Une erreur est survenue';
        console.error('Erreur lors de la sauvegarde:', err);
      }
    });
  }

  deleteJeu(jeu: JeuxResponseDto) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${jeu.nom}" ?`)) {
      return;
    }

    this.loading = true;
    this.jeuxService.deleteJeu(jeu.id).subscribe({
      next: () => {
        this.loading = false;
        // MISE À JOUR AUTOMATIQUE : on retire le jeu de la liste locale
        this.jeux = this.jeux.filter(j => j.id !== jeu.id); 
        console.log('Jeu supprimé de l’affichage local');
      },
      error: (err) => {
        this.loading = false;
        const msg = err.error?.message || 'Erreur lors de la suppression';
        alert(`Erreur: ${msg}`);
      }
    });
  }

  private getEmptyJeu(): JeuxRequestDto {
    return {
      nom: '',
      quantite: 0,
      description: '',
      coordonnees: { latitude: '0', longitude: '0' }
    };
  }
}
