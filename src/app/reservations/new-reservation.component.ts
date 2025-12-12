import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationsService } from './reservations.service';
import { Router } from '@angular/router';
import { ReservationRequestDto } from '../shared/models/reservation.dto';

@Component({
  selector: 'app-new-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="wrap">
    <h2>Nouvelle réservation</h2>
    <form (ngSubmit)="onSubmit()" class="form">
      <label>Jeu ID</label>
      <input type="number" [(ngModel)]="form.jeuxId" name="jeuxId" required />

      <label>Date</label>
      <input type="date" [(ngModel)]="date" name="date" required />

      <label>Début</label>
      <input type="time" [(ngModel)]="start" name="start" required />

      <label>Fin</label>
      <input type="time" [(ngModel)]="end" name="end" required />

      <label>Quantité</label>
      <input type="number" [(ngModel)]="form.quantity" name="quantity" min="1" required />

      <label>Notes</label>
      <textarea [(ngModel)]="form.notes" name="notes"></textarea>

      <button type="submit">Réserver</button>
    </form>
  </div>
  `,
  styles: [
    `.wrap{max-width:640px;margin:20px auto;padding:0 16px}`,
    `.form{display:grid;grid-template-columns:1fr;gap:12px}`
  ]
})
export class NewReservationComponent {
  form: ReservationRequestDto = {
    jeuxId: 0,
    bookingDate: '',
    startTime: '',
    endTime: '',
    quantity: 1,
    notes: ''
  };
  date = '';
  start = '';
  end = '';

  constructor(private service: ReservationsService, private router: Router) {}

  onSubmit() {
    // Convertir inputs HTML (date/time) en ISO local strings attendus par backend
    this.form.bookingDate = this.date;         // yyyy-MM-dd
    this.form.startTime = this.start;          // HH:mm
    this.form.endTime = this.end;              // HH:mm

    this.service.create(this.form).subscribe({
      next: () => this.router.navigate(['/reservations/mine']),
      error: () => {}
    });
  }
}
