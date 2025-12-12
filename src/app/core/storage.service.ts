import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = 'aj_token';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private get isBrowser() { return isPlatformBrowser(this.platformId); }

  get token(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(TOKEN_KEY);
  }
  set token(val: string | null) {
    if (!this.isBrowser) return; // no-op on server
    if (val) localStorage.setItem(TOKEN_KEY, val); else localStorage.removeItem(TOKEN_KEY);
  }
  clear() { if (this.isBrowser) localStorage.removeItem(TOKEN_KEY); }
}
