export interface ReservationRequestDto {
  jeuxId: number;
  bookingDate: string; // Doit être "YYYY-MM-DD"
  startTime: string;   // Doit être "HH:mm"
  endTime: string;     // Doit être "HH:mm"
  quantity: number;
  notes?: string | null;
}

export interface ReservationResponseDto {
  id: number;
  jeuxId: number;
  dateDebut: string; // ISO string
  dateFin: string;   // ISO string
  quantity: number;
  status: string;
  notes: string | null;
  utilisateurUsername?: string;
}

export interface ReservationUpdateStatusDto {
  status: string;
}