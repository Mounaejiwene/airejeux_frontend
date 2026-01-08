import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../services/reservations.service';
import { ReservationResponseDto } from '../../../shared/models/reservation.dto';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold mb-6">Mes Réservations</h2>
      <div *ngIf="reservations.length > 0; else empty" class="space-y-4">
        <div *ngFor="let r of reservations" class="p-4 border rounded-lg shadow-sm bg-white">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-bold text-blue-600">Réservation #{{r.id}} - {{r.jeuxNom || 'Jeu #' + r.jeuxId}}</p>
              <div class="text-sm text-gray-600 mt-1">
                <strong>Date:</strong> {{r.bookingDate}} | 
                <strong>Heure:</strong> {{r.startTime}} - {{r.endTime}}
              </div>
              <p class="text-sm mt-2"><strong>Quantité:</strong> {{r.quantity}}</p>
            </div>
            <span [class]="'px-2 py-1 rounded text-xs font-bold ' + getStatusClass(r.status)">
              {{r.status}}
            </span>
          </div>
        </div>
      </div>
      <ng-template #empty><p class="text-gray-500">Aucune réservation trouvée.</p></ng-template>
    </div>
  `
})
export class MyReservationsComponent implements OnInit {
  reservations: ReservationResponseDto[] = [];
  constructor(private service: ReservationsService) {}
  ngOnInit() { this.service.getMyReservations().subscribe(data => this.reservations = data); }
  getStatusClass(s: string) {
    if (s === 'APPROVED') return 'bg-green-100 text-green-700';
    if (s === 'REJECTED') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  }
}