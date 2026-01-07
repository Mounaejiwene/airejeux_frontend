import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import { StorageService } from './storage.service';
import { UserDto } from '../shared/models/user.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private api: ApiConfigService,
    private storage: StorageService,
  ) {}

  login(dto: Pick<UserDto, 'username' | 'password'>): Observable<string> {
    return this.http.post(this.api.apiBaseUrl + '/auth/login', dto, { responseType: 'text' }).pipe(
      tap(token => this.storage.token = token)
    );
  }

  register(dto: UserDto): Observable<string> {
    const payload: UserDto = { ...dto, role: 'USER' };
    return this.http.post(this.api.apiBaseUrl + '/auth/register', payload, { responseType: 'text' });
  }

  logout() { this.storage.clear(); }
  isAuthenticated(): boolean { return !!this.storage.token; }
  getToken(): string | null { return this.storage.token; }

  private parseJwt<T = any>(token?: string | null): T | null {
    try {
      const t = token ?? this.storage.token;
      if (!t) return null;
      const payload = t.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch { return null; }
  }

  getUsername(): string | null {
    const p: any = this.parseJwt();
    // Common JWT claim names; adjust if backend uses custom
    return p?.sub || p?.username || null;
  }

  getRole(): string | null {
    const p: any = this.parseJwt();
    // Could be 'role' or array 'roles' like ['ROLE_ADMIN']
    const role = p?.role ?? (Array.isArray(p?.roles) ? p.roles[0] : null);
    if (typeof role === 'string') return role.replace('ROLE_', '');
    return null;
  }

  isAdmin(): boolean { return this.getRole() === 'ADMIN'; }
}
