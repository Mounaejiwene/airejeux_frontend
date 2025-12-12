import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../reservations/reservations.service';
import { ReservationResponseDto } from '../shared/models/reservation.dto';

@Component({
  selector: 'app-admin-reservations',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="wrap">
    <h2>Réservations en attente</h2>
    <div class="list" *ngIf="items.length; else empty">
      <div class="item" *ngFor="let r of items">
        <div>
          <div><strong>ID:</strong> {{r.id}} | <strong>Utilisateur:</strong> {{r.utilisateurUsername}} | <strong>Jeu:</strong> {{r.jeuxId}}</div>
          <div><strong>Date:</strong> {{r.bookingDate}} | <strong>Heure:</strong> {{r.startTime}} - {{r.endTime}} | <strong>Qté:</strong> {{r.quantity}}</div>
          <div><strong>Statut:</strong> {{r.status}}</div>
        </div>
        <div class="actions">
          <button (click)="update(r.id!, 'APPROVED')" [disabled]="loadingId===r.id">Approuver</button>
          <button (click)="update(r.id!, 'REJECTED')" [disabled]="loadingId===r.id">Rejeter</button>
        </div>
      </div>
    </div>
    <ng-template #empty><p>Aucune réservation en attente.</p></ng-template>
  </div>
  `,
  styles: [
    `.wrap{max-width:1000px;margin:20px auto;padding:0 16px}`,
    `.list{display:flex;flex-direction:column;gap:12px}`,
    `.item{display:flex;justify-content:space-between;align-items:center;border:1px solid #eee;border-radius:10px;padding:10px;background:#fff}`,
    `.actions{display:flex;gap:8px}`
  ]
})
export class AdminReservationsComponent implements OnInit {
  items: ReservationResponseDto[] = [];
  loadingId: number | null = null;
  constructor(private service: ReservationsService) {}
  ngOnInit() { this.refresh(); }
  refresh() { this.service.pending().subscribe(d => this.items = d); }
  update(id: number, status: string) {
    this.loadingId = id;
    this.service.updateStatus(id, { status }).subscribe({
      next: () => { this.loadingId = null; this.refresh(); },
      error: () => { this.loadingId = null; }
    });
  }
}
