import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JeuxService } from '../../jeux/services/jeux.service';
import { JeuxResponseDto } from '../../../shared/models/jeux.dto';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="map-container">
      <div class="map-header">
        <h1>Carte des Aires de Jeux</h1>
        <p>Découvrez les {{ totalJeux }} équipements de jeux répartis dans la ville</p>
      </div>

      <div class="content">
        <!-- Carte -->
        <div class="map-section">
          <div id="map" class="map"></div>
        </div>

        <!-- Liste des jeux -->
        <div class="list-section">
          <div class="search-bar">
            <input
              type="text"
              placeholder="🔍 Rechercher un jeu..."
              (input)="filterJeux($event)"
            >
          </div>

          @if (isLoading) {
            <div class="loading">Chargement des jeux...</div>
          }

          <div class="jeux-grid">
            @for (jeu of filteredJeux; track jeu.id) {
              <div class="jeu-card" (click)="centerOnJeu(jeu)">
                <div class="jeu-header">
                  <h3>{{ jeu.nom }}</h3>
                  <span class="quantity">x{{ jeu.quantite }}</span>
                </div>
                <p class="description">{{ jeu.description || 'Pas de description' }}</p>
                <div class="jeu-footer">
                  <span class="coords">
                    📍 {{ jeu.coordonnees.latitude | number:'1.4-4' }}, {{ jeu.coordonnees.longitude | number:'1.4-4' }}
                  </span>
                  <a [routerLink]="['/reservations/new']" [queryParams]="{jeuxId: jeu.id}" class="btn-reserve">
                    Réserver
                  </a>
                </div>
              </div>
            }
          </div>

          @if (!isLoading && filteredJeux.length === 0) {
            <div class="no-results">Aucun jeu trouvé</div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .map-container {
      min-height: calc(100vh - 80px);
      background: #f5f7fa;
    }

    .map-header {
      text-align: center;
      padding: 2rem;
      background: #667eea;
      color: white;
    }

    .map-header h1 {
      margin: 0;
      font-size: 2rem;
    }

    .map-header p {
      margin: 0.5rem 0 0;
      opacity: 0.9;
    }

    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      padding: 1rem;
      max-width: 1600px;
      margin: 0 auto;
    }

    @media (max-width: 1024px) {
      .content {
        grid-template-columns: 1fr;
      }
    }

    .map-section {
      position: sticky;
      top: 1rem;
      height: calc(100vh - 200px);
    }

    .map {
      height: 100%;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .list-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .search-bar input {
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      box-sizing: border-box;
    }

    .search-bar input:focus {
      outline: none;
      box-shadow: 0 2px 15px rgba(102, 126, 234, 0.3);
    }

    .jeux-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-height: calc(100vh - 300px);
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    .jeux-grid::-webkit-scrollbar {
      width: 8px;
    }

    .jeux-grid::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    .jeux-grid::-webkit-scrollbar-thumb {
      background: #667eea;
      border-radius: 10px;
    }

    .jeu-card {
      background: white;
      border-radius: 10px;
      padding: 1rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .jeu-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }

    .jeu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .jeu-header h3 {
      margin: 0;
      color: #333;
      font-size: 1rem;
    }

    .quantity {
      background: #667eea;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 15px;
      font-size: 0.8rem;
    }

    .description {
      color: #666;
      font-size: 0.9rem;
      margin: 0.5rem 0;
    }

    .jeu-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      padding-top: 0.5rem;
      border-top: 1px solid #eee;
    }

    .coords {
      font-size: 0.75rem;
      color: #999;
    }

    .btn-reserve {
      background: #28a745;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      text-decoration: none;
      font-size: 0.85rem;
      transition: background 0.2s;
    }

    .btn-reserve:hover {
      background: #218838;
    }

    .loading, .no-results {
      text-align: center;
      padding: 2rem;
      color: #666;
    }
  `]
})
export class MapComponent implements OnInit {
  jeux: JeuxResponseDto[] = [];
  filteredJeux: JeuxResponseDto[] = [];
  isLoading = true;
  totalJeux = 0;
  private map: any;
  private markers: any[] = [];
  private isBrowser: boolean;

  constructor(
    private jeuxService: JeuxService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadJeux();
  }

  private async initMap(): Promise<void> {
    if (!this.isBrowser) return;

    // Import dynamique de Leaflet
    const L = await import('leaflet');

    // Centre de Tours, France
    this.map = L.map('map').setView([47.394, 0.6848], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Icône personnalisée
    const customIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    // Ajouter les markers
    this.jeux.forEach(jeu => {
      if (jeu.coordonnees) {
        const lat = parseFloat(jeu.coordonnees.latitude);
        const lng = parseFloat(jeu.coordonnees.longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
          const marker = L.marker([lat, lng], { icon: customIcon })
            .addTo(this.map)
            .bindPopup(`
              <strong>${jeu.nom}</strong><br>
              ${jeu.description || ''}<br>
              <small>Quantité: ${jeu.quantite}</small>
            `);
          this.markers.push({ id: jeu.id, marker });
        }
      }
    });
  }

  private loadJeux(): void {
    this.jeuxService.getAllJeux().subscribe({
      next: (data) => {
        this.jeux = data;
        this.filteredJeux = data;
        this.totalJeux = data.length;
        this.isLoading = false;
        setTimeout(() => this.initMap(), 100);
      },
      error: (err) => {
        console.error('Erreur chargement jeux:', err);
        this.isLoading = false;
      }
    });
  }

  filterJeux(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredJeux = this.jeux.filter(jeu =>
      jeu.nom.toLowerCase().includes(query) ||
      (jeu.description && jeu.description.toLowerCase().includes(query))
    );
  }

  centerOnJeu(jeu: JeuxResponseDto): void {
    if (!this.map || !jeu.coordonnees) return;

    const lat = parseFloat(jeu.coordonnees.latitude);
    const lng = parseFloat(jeu.coordonnees.longitude);

    if (!isNaN(lat) && !isNaN(lng)) {
      this.map.setView([lat, lng], 16);

      const markerObj = this.markers.find(m => m.id === jeu.id);
      if (markerObj) {
        markerObj.marker.openPopup();
      }
    }
  }
}
