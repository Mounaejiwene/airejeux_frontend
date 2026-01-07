import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiConfigService {
  // Backend Spring runs separately
  readonly apiBaseUrl = 'http://localhost:8080/api';
}
