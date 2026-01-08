import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../../reservations/services/reservations.service';
import { ReservationResponseDto } from '../../../shared/models/reservation.dto';

@Component({
  selector: 'app-admin-reservations',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="wrap">
    <div class="header">
      <h2>Réservations en attente</h2>
      <button class="btn-refresh" (click)="refresh()" [disabled]="loadingId !== null">🔄 Actualiser</button>
    </div>

    <div class="list" *ngIf="items.length; else empty">
      <div class="item shadow-sm" *ngFor="let r of items">
        <div class="info">
          <div class="main-info">
            <span class="badge-id">#{{r.id}}</span>
            <strong>Utilisateur:</strong> {{r.utilisateurUsername}} | 
            <strong>Jeu (ID):</strong> {{r.jeuxId}}
          </div>
          
          <div class="date-info">
            <strong>Date:</strong> {{r.dateDebut | date:'dd/MM/yyyy'}} | 
            <strong>Heure:</strong> {{r.dateDebut | date:'HH:mm'}} - {{r.dateFin | date:'HH:mm'}} | 
            <strong>Qté:</strong> {{r.quantity}}
          </div>

          <div class="status-row">
            <span class="status-label">Statut actuel:</span>
            <span class="status-value pending">{{r.status}}</span>
          </div>
          
          <div *ngIf="r.notes" class="notes">
            <strong>Note:</strong> {{r.notes}}
          </div>
        </div>

        <div class="actions">
          <button class="btn-approve" (click)="update(r.id, 'APPROVED')" [disabled]="loadingId === r.id">
            {{ loadingId === r.id ? '...' : 'Approuver' }}
          </button>
          <button class="btn-reject" (click)="update(r.id, 'REJECTED')" [disabled]="loadingId === r.id">
            Rejeter
          </button>
        </div>
      </div>
    </div>
    
    <ng-template #empty>
      <div class="empty-state">
        <p>Aucune réservation en attente de validation.</p>
      </div>
    </ng-template>
  </div>
  `,
  styles: [`
    .wrap { max-width: 1000px; margin: 20px auto; padding: 0 16px; font-family: sans-serif; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .list { display: flex; flex-direction: column; gap: 16px; }
    .item { display: flex; justify-content: space-between; align-items: center; border: 1px solid #eef2f7; border-radius: 12px; padding: 20px; background: #fff; transition: all 0.2s; }
    .item:hover { border-color: #3498db; }
    .info { display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .main-info { font-size: 1.1rem; color: #2c3e50; }
    .date-info { color: #5d6d7e; font-size: 0.95rem; }
    .badge-id { background: #f1f3f5; padding: 2px 8px; border-radius: 4px; margin-right: 8px; font-weight: bold; font-size: 0.85rem; }
    .status-row { margin-top: 5px; }
    .status-value.pending { color: #f39c12; font-weight: bold; text-transform: uppercase; font-size: 0.85rem; }
    .notes { font-size: 0.85rem; color: #7f8c8d; font-style: italic; margin-top: 5px; background: #f9f9f9; padding: 5px 10px; border-radius: 6px; }
    .actions { display: flex; gap: 10px; margin-left: 20px; }
    
    button { padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; border: none; transition: 0.2s; }
    .btn-approve { background: #27ae60; color: white; }
    .btn-approve:hover:not(:disabled) { background: #219150; }
    .btn-reject { background: #ecf0f1; color: #c0392b; border: 1px solid #fab1a0; }
    .btn-reject:hover:not(:disabled) { background: #ff7675; color: white; }
    .btn-refresh { background: #3498db; color: white; padding: 8px 16px; font-size: 0.9rem; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .empty-state { text-align: center; padding: 60px; background: #f8f9fa; border-radius: 12px; color: #95a5a6; }
  `]
})
export class AdminReservationsComponent implements OnInit {
  items: ReservationResponseDto[] = [];
  loadingId: number | null = null;

  constructor(private service: ReservationsService) {}

  ngOnInit() { 
    this.refresh(); 
  }

  refresh() { 
    this.service.getPendingReservation().subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error('Erreur chargement admin:', err)
    });
  }

  update(id: number, status: string) {
    this.loadingId = id;
    this.service.updateReservationStatus(id, { status }).subscribe({
      next: () => { 
        this.loadingId = null; 
        this.refresh(); 
      },
      error: (err) => { 
        this.loadingId = null; 
        alert('Erreur lors de la mise à jour : ' + (err.error?.message || 'Serveur indisponible'));
      }
    });
  }
}