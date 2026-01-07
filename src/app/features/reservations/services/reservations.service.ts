import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../../core/services/api-config.service';
import { ReservationRequestDto, ReservationResponseDto, ReservationUpdateStatusDto } from '../../../shared/models/reservation.dto';

@Injectable({ providedIn: 'root' })
export class ReservationsService {
  constructor(private http: HttpClient, private api: ApiConfigService) {}

  createReservation(dto: ReservationRequestDto): Observable<ReservationResponseDto> {
    return this.http.post<ReservationResponseDto>(`${this.api.apiBaseUrl}/reservations`, dto);
  }

  getMyReservations(): Observable<ReservationResponseDto[]> {
    return this.http.get<ReservationResponseDto[]>(`${this.api.apiBaseUrl}/reservations/my-reservations`);
  }

  cancelReservation(id: number): Observable<ReservationResponseDto> {
    return this.http.patch<ReservationResponseDto>(`${this.api.apiBaseUrl}/reservations/${id}/cancel`, {});
  }

  // Admin only (placeholders for later UI)
  getPendingReservation(): Observable<ReservationResponseDto[]> {
    return this.http.get<ReservationResponseDto[]>(`${this.api.apiBaseUrl}/reservations/pending`);
  }

  updateReservationStatus(id: number, dto: ReservationUpdateStatusDto): Observable<ReservationResponseDto> {
    return this.http.patch<ReservationResponseDto>(`${this.api.apiBaseUrl}/reservations/${id}/status`, dto);
  }
}
