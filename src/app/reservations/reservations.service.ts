import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../core/api-config.service';
import { ReservationRequestDto, ReservationResponseDto, ReservationUpdateStatusDto } from '../shared/models/reservation.dto';

@Injectable({ providedIn: 'root' })
export class ReservationsService {
  constructor(private http: HttpClient, private api: ApiConfigService) {}

  create(dto: ReservationRequestDto): Observable<ReservationResponseDto> {
    return this.http.post<ReservationResponseDto>(`${this.api.apiBaseUrl}/reservations`, dto);
  }

  mine(): Observable<ReservationResponseDto[]> {
    return this.http.get<ReservationResponseDto[]>(`${this.api.apiBaseUrl}/reservations/my-reservations`);
  }

  cancel(id: number): Observable<ReservationResponseDto> {
    return this.http.patch<ReservationResponseDto>(`${this.api.apiBaseUrl}/reservations/${id}/cancel`, {});
  }

  // Admin only (placeholders for later UI)
  pending(): Observable<ReservationResponseDto[]> {
    return this.http.get<ReservationResponseDto[]>(`${this.api.apiBaseUrl}/reservations/pending`);
  }

  updateStatus(id: number, dto: ReservationUpdateStatusDto): Observable<ReservationResponseDto> {
    return this.http.patch<ReservationResponseDto>(`${this.api.apiBaseUrl}/reservations/${id}/status`, dto);
  }
}
