import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const allowed: string[] = (route.data && (route.data['roles'] as string[])) || [];
  const role = auth.getRole();
  if (auth.isAuthenticated() && (!allowed.length || (role && allowed.includes(role)))) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
