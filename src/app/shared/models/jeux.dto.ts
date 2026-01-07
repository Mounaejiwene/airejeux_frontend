export interface CoordonneesDto {
  latitude: string;
  longitude: string;
}
export interface JeuxRequestDto {
  nom: string;
  quantite: number;
  description?: string;
  coordonnees: CoordonneesDto;
}
export interface JeuxResponseDto extends JeuxRequestDto { id: number; }
