import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../../core/services/api-config.service';
import { JeuxRequestDto, JeuxResponseDto } from '../../../shared/models/jeux.dto';

@Injectable({ providedIn: 'root' })
export class JeuxService {
  constructor(private http: HttpClient, private api: ApiConfigService) {}

  getAllJeux(): Observable<JeuxResponseDto[]> {
    return this.http.get<JeuxResponseDto[]>(`${this.api.apiBaseUrl}/jeux`);
  }

  getJeuxById(id: number): Observable<JeuxResponseDto> {
    return this.http.get<JeuxResponseDto>(`${this.api.apiBaseUrl}/jeux/${id}`);
  }

  createJeu(jeu: JeuxRequestDto): Observable<JeuxResponseDto> {
    return this.http.post<JeuxResponseDto>(this.api.apiBaseUrl, jeu);
  }

  updateJeu(id: number, jeu: JeuxRequestDto): Observable<JeuxResponseDto> {
    return this.http.put<JeuxResponseDto>(`${this.api.apiBaseUrl}/${id}`, jeu);
  }

  deleteJeu(id: number): Observable<string> {
    return this.http.delete(`${this.api.apiBaseUrl}/${id}`, { responseType: 'text' });
  }

}
