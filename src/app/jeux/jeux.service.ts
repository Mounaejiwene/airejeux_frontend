import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../core/api-config.service';
import { JeuxResponseDto } from '../shared/models/jeux.dto';

@Injectable({ providedIn: 'root' })
export class JeuxService {
  constructor(private http: HttpClient, private api: ApiConfigService) {}

  getAll(): Observable<JeuxResponseDto[]> {
    return this.http.get<JeuxResponseDto[]>(`${this.api.apiBaseUrl}/jeux`);
  }
}
