import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../services/reservations.service';
import { ReservationResponseDto } from '../../../shared/models/reservation.dto';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="wrap">
    <h2>Mes réservations</h2>
    <div class="list" *ngIf="reservations.length; else empty">
      <div class="item" *ngFor="let r of reservations">
        <div>
          <div><strong>Jeu:</strong> {{r.jeuxId}} | <strong>Date:</strong> {{r.bookingDate}} | <strong>Heure:</strong> {{r.startTime}} - {{r.endTime}}</div>
          <div><strong>Quantité:</strong> {{r.quantity}} | <strong>Statut:</strong> {{r.status}}</div>
          <div *ngIf="r.notes"><em>{{r.notes}}</em></div>
        </div>
        <button (click)="cancel(r)" [disabled]="loadingId===r.id">Annuler</button>
      </div>
    </div>
    <ng-template #empty>
      <p>Aucune réservation.</p>
    </ng-template>
  </div>
  `,
  styles: [
    `.wrap{max-width:900px;margin:20px auto;padding:0 16px}`,
    `.list{display:flex;flex-direction:column;gap:12px}`,
    `.item{display:flex;justify-content:space-between;align-items:center;border:1px solid #eee;border-radius:10px;padding:10px;background:#fff}`
  ]
})
export class MyReservationsComponent implements OnInit {
  reservations: ReservationResponseDto[] = [];
  loadingId: number | null = null;

  constructor(private service: ReservationsService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.service.getMyReservations().subscribe(d => this.reservations = d);
  }

  cancel(r: ReservationResponseDto) {
    if (!r.id) return;
    this.loadingId = r.id;
    this.service.cancelReservation(r.id).subscribe({
      next: () => { this.loadingId = null; this.refresh(); },
      error: () => { this.loadingId = null; }
    });
  }
}
