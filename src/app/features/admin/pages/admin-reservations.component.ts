import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../../reservations/services/reservations.service';
import { ReservationResponseDto } from '../../../shared/models/reservation.dto';
import { ToastService } from '../../../shared/services/toast.service';

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

    <div class="table-container" *ngIf="items.length; else empty">
      <table class="reservation-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Utilisateur</th>
            <th>Jeu</th>
            <th>Date</th>
            <th>Horaire</th>
            <th>Quantité</th>
            <th>Statut</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let r of items">
            <td><span class="badge-id">#{{r.id}}</span></td>
            <td>{{r.utilisateurUsername}}</td>
            <td><strong>{{r.jeuxNom || 'Jeu #' + r.jeuxId}}</strong></td>
            <td>{{r.bookingDate}}</td>
            <td>{{r.startTime}} - {{r.endTime}}</td>
            <td>{{r.quantity}}</td>
            <td><span class="status-badge pending">{{r.status}}</span></td>
            <td>{{r.notes || '-'}}</td>
            <td class="actions-cell">
              <button class="btn-approve" (click)="update(r.id, 'APPROVED')" [disabled]="loadingId === r.id">
                {{ loadingId === r.id ? '...' : '✓' }}
              </button>
              <button class="btn-reject" (click)="update(r.id, 'REJECTED')" [disabled]="loadingId === r.id">
                ✗
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ng-template #empty>
      <div class="empty-state">
        <p>Aucune réservation en attente de validation.</p>
      </div>
    </ng-template>
  </div>
  `,
  styles: [`
    .wrap { max-width: 1200px; margin: 20px auto; padding: 0 16px; font-family: sans-serif; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    h2 { margin: 0; color: #2c3e50; }

    .table-container { overflow-x: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }

    .reservation-table { width: 100%; border-collapse: collapse; }
    .reservation-table th, .reservation-table td { padding: 14px 16px; text-align: left; border-bottom: 1px solid #eef2f7; }
    .reservation-table th { background: #f8f9fa; color: #5d6d7e; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; }
    .reservation-table tbody tr:hover { background: #f8fbff; }
    .reservation-table tbody tr:last-child td { border-bottom: none; }

    .badge-id { background: #e3e8ee; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 0.85rem; }
    .status-badge { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
    .status-badge.pending { background: #fff3cd; color: #856404; }

    .actions-cell { display: flex; gap: 8px; }
    button { padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: 600; border: none; transition: 0.2s; }
    .btn-approve { background: #27ae60; color: white; }
    .btn-approve:hover:not(:disabled) { background: #219150; }
    .btn-reject { background: #e74c3c; color: white; }
    .btn-reject:hover:not(:disabled) { background: #c0392b; }
    .btn-refresh { background: #3498db; color: white; padding: 8px 16px; font-size: 0.9rem; border-radius: 8px; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }

    .empty-state { text-align: center; padding: 60px; background: #f8f9fa; border-radius: 12px; color: #95a5a6; }
  `]
})
export class AdminReservationsComponent implements OnInit {
  items: ReservationResponseDto[] = [];
  loadingId: number | null = null;

  constructor(private service: ReservationsService, private toast: ToastService) {}

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
        this.toast.success(status === 'APPROVED' ? 'Réservation approuvée !' : 'Réservation rejetée');
        this.refresh();
      },
      error: (err) => {
        this.loadingId = null;
        const msg = err.error?.message || 'Serveur indisponible';
        this.toast.error('Erreur : ' + msg);
      }
    });
  }
}
