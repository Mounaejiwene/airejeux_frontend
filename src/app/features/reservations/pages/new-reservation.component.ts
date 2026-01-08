import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservationsService } from '../services/reservations.service';
import { JeuxService } from '../../jeux/services/jeux.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-new-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Finaliser votre créneau</h2>

    <form (ngSubmit)="onSubmit()" #resForm="ngForm" class="space-y-6">
      <div>
        <label class="block text-sm font-semibold text-gray-600 mb-2">Date de l'activité</label>
        <input type="date" [(ngModel)]="date" name="date" required
               class="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all">
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-2">Heure de début</label>
          <input type="time" [(ngModel)]="start" name="start" required
                 class="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none">
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-2">Heure de fin</label>
          <input type="time" [(ngModel)]="end" name="end" required
                 class="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none">
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-600 mb-2">
            Quantité (Max disponible : {{ maxAvailable }})
        </label>
        <input type="number" [(ngModel)]="form.quantity" name="quantity"
               min="1" [max]="maxAvailable" required
               class="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none">
        <p *ngIf="form.quantity > maxAvailable" class="text-red-500 text-xs mt-1">
            La quantité dépasse le stock disponible.
        </p>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-600 mb-2">Notes</label>
        <textarea [(ngModel)]="form.notes" name="notes" rows="3"
                  placeholder="Informations complémentaires..."
                  class="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none"></textarea>
      </div>

      <button type="submit" [disabled]="resForm.invalid || loading || form.quantity > maxAvailable"
              class="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50">
        {{ loading ? 'Enregistrement...' : 'Confirmer la réservation' }}
      </button>

      <button type="button" (click)="onCancel()" class="w-full text-gray-400 text-sm hover:text-gray-600">
        Annuler et revenir aux jeux
      </button>
    </form>
  </div>
  `
})
export class NewReservationComponent implements OnInit {
  form: any = {
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
  loading = false;
  maxAvailable = 1;

  constructor(
    private service: ReservationsService,
    private jeuxService: JeuxService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.form.jeuxId = +params['id'] || 0;
      if (!this.form.jeuxId) {
        this.router.navigate(['/jeux']);
      } else {
        // CORRECTION : getJeuxById (avec un 'x') et typage du paramètre 'jeu'
        this.jeuxService.getJeuxById(this.form.jeuxId).subscribe((jeu: any) => {
            this.maxAvailable = jeu.quantite;
        });
      }
    });
  }

  onSubmit() {
    this.loading = true;
    this.form.bookingDate = this.date;
    this.form.startTime = this.start;
    this.form.endTime = this.end;

    this.service.createReservation(this.form).subscribe({
      next: () => {
        this.toast.success('Réservation créée avec succès !');
        this.router.navigate(['/reservations/mine']);
      },
      error: (err) => {
        this.loading = false;
        const errorMsg = err.error?.message || 'Erreur lors de l\'enregistrement';
        this.toast.error(errorMsg);
      }
    });
  }

  onCancel() { this.router.navigate(['/jeux']); }
}
