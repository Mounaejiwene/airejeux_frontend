import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JeuxService } from '../services/jeux.service';
import { JeuxResponseDto } from '../../../shared/models/jeux.dto';

@Component({
  selector: 'app-jeux-list',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="wrap">
    <h2>Jeux</h2>
    <div class="grid">
      <div class="card" *ngFor="let j of jeux">
        <h3>{{j.nom}}</h3>
        <p>{{j.description}}</p>
        <small>Quantité: {{j.quantite}}</small>
      </div>
    </div>
  </div>
  `,
  styles: [
    `.wrap{max-width:1000px;margin:20px auto;padding:0 16px}`,
    `.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}`,
    `.card{border:1px solid #eee;border-radius:12px;padding:12px;background:#fff}`
  ]
})
export class JeuxListComponent implements OnInit {
  jeux: JeuxResponseDto[] = [];
  constructor(private service: JeuxService) {}
  ngOnInit() { this.service.getAllJeux().subscribe(d => this.jeux = d); }
}
