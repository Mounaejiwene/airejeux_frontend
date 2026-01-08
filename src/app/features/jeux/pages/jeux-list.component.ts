import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import nécessaire pour le bouton de réservation
import { JeuxService } from '../services/jeux.service';
import { JeuxResponseDto } from '../../../shared/models/jeux.dto';

@Component({
  selector: 'app-jeux-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header-section">
        <h2 class="title">Catalogue des Équipements</h2>
        <p class="subtitle">Sélectionnez un jeu pour effectuer une demande de réservation.</p>
      </div>
      
      <div class="grid" *ngIf="jeux.length > 0; else emptyState">
        <div class="card" *ngFor="let jeu of jeux">
          <div class="card-header">
            <span class="badge">Disponibilité : {{ jeu.quantite }}</span>
          </div>
          
          <div class="card-body">
            <h3>{{ jeu.nom }}</h3>
            <p class="description">{{ jeu.description || 'Aucune description fournie pour cet équipement.' }}</p>
            
            <div class="location" *ngIf="jeu.coordonnees">
              📍 Latitude: {{ jeu.coordonnees.latitude }}, Longitude: {{ jeu.coordonnees.longitude }}
            </div>
          </div>
          
          <div class="card-footer">
            <button 
              class="btn-reserve" 
              [routerLink]="['/reservations/new']" 
              [queryParams]="{ id: jeu.id, nom: jeu.nom }">
              Réserver cet équipement
            </button>
          </div>
        </div>
      </div>

      <ng-template #emptyState>
        <div class="empty-msg">
          <p>Chargement des jeux ou aucun équipement disponible pour le moment.</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .header-section { margin-bottom: 40px; text-align: left; }
    .title { color: #2c3e50; font-size: 2rem; margin: 0; font-weight: 700; }
    .subtitle { color: #7f8c8d; margin-top: 10px; font-size: 1.1rem; }
    
    .grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
      gap: 30px; 
    }

    .card { 
      background: white; 
      border-radius: 15px; 
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08); 
      display: flex; 
      flex-direction: column;
      transition: all 0.3s ease;
      border: 1px solid #f0f0f0;
    }
    .card:hover { transform: translateY(-8px); box-shadow: 0 12px 30px rgba(0,0,0,0.12); }

    .card-header { padding: 15px 20px 0; display: flex; justify-content: flex-end; }
    .badge { background: #e3f2fd; color: #3498db; padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; }

    .card-body { padding: 20px; flex-grow: 1; }
    h3 { margin: 0 0 12px; color: #2c3e50; font-size: 1.3rem; }
    .description { color: #636e72; font-size: 0.95rem; line-height: 1.5; margin-bottom: 20px; min-height: 60px; }
    .location { font-size: 0.8rem; color: #b2bec3; font-style: italic; }

    .card-footer { padding: 20px; background: #fafafa; }
    
    .btn-reserve { 
      width: 100%; 
      padding: 12px; 
      background: #3498db; 
      color: white; 
      border: none; 
      border-radius: 10px; 
      font-weight: 700; 
      font-size: 0.95rem;
      cursor: pointer; 
      transition: background 0.2s;
    }
    .btn-reserve:hover { background: #2980b9; }

    .empty-msg { text-align: center; padding: 100px 0; color: #bdc3c7; }
  `]
})
export class JeuxListComponent implements OnInit { // Nom de classe corrigé ici
  jeux: JeuxResponseDto[] = [];

  constructor(private jeuxService: JeuxService) {}

  ngOnInit(): void {
    this.loadAllJeux();
  }

  loadAllJeux(): void {
    this.jeuxService.getAllJeux().subscribe({
      next: (data) => {
        this.jeux = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des jeux :', err);
      }
    });
  }
}