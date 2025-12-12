import { User } from './user.model';

export interface Reservation {
  id: number;

  utilisateur: User;          // Correspond à @ManyToOne
  jeuxId: number;

  bookingDate: string;        // LocalDate → string (ex: "2025-11-14")
  startTime: string;          // LocalTime → "14:00"
  endTime: string;

  quantity: number;

  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

  notes: string | null;

  createdAt: string;          // LocalDateTime → string
  updatedAt: string;

  reservation: number | null;  // champ legacy
}
