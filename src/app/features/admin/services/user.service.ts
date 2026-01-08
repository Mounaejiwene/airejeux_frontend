import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../../core/services/api-config.service';
import { UserDto } from '../../../shared/models/user.dto';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private api: ApiConfigService
  ) {
    this.baseUrl = this.api.apiBaseUrl + '/users';
  }

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.baseUrl);
  }

  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/${id}`);
  }

  createUser(user: UserDto): Observable<string> {
    return this.http.post(`${this.baseUrl}`, user, { responseType: 'text' });
  }

  updateUser(id: number, user: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
