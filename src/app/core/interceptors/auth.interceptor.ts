import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const session = auth.session();
  if (session) {
    req = req.clone({
      setHeaders: {
        'x-user-id': session.userId,
        'x-user-role': session.role,
      },
    });
  }
  return next(req);
};
