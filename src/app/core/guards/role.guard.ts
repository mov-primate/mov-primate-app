import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RoleEnum } from '../../shared/enums/role.enum';

export function roleGuard(...allowedRoles: RoleEnum[]): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (!auth.isLoggedIn()) {
      router.navigate(['/auth/login']);
      return false;
    }
    if (allowedRoles.length && !auth.hasRole(...allowedRoles)) {
      router.navigate(['/']);
      return false;
    }
    return true;
  };
}
