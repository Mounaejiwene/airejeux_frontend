export interface CoordonneesDto { lat?: number; lng?: number; }
export interface JeuxRequestDto {
  nom: string;
  quantite: number;
  description?: string;
  coordonnees?: CoordonneesDto;
}
export interface JeuxResponseDto extends JeuxRequestDto { id: number; }
