export interface ReservationRequestDto {
  jeuxId: number;
  bookingDate: string; // ISO LocalDate
  startTime: string;   // ISO LocalTime
  endTime: string;     // ISO LocalTime
  quantity: number;
  notes?: string;
}
export interface ReservationResponseDto extends ReservationRequestDto {
  id: number;
  utilisateurId?: number;
  utilisateurUsername?: string;
  status?: string;
}
export interface ReservationUpdateStatusDto { status: string; }
