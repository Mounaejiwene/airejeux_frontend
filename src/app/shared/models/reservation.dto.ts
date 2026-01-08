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
  utilisateurId?: number;
  utilisateurUsername?: string;
  jeuxId: number;
  jeuxNom?: string;     // Nom du jeu réservé
  bookingDate: string; // "YYYY-MM-DD"
  startTime: string;   // "HH:mm:ss"
  endTime: string;     // "HH:mm:ss"
  quantity: number;
  status: string;
  notes: string | null;
}

export interface ReservationUpdateStatusDto {
  status: string;
}
