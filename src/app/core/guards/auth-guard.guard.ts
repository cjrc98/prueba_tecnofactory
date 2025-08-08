// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const uid = localStorage.getItem('uid');

  // Si NO hay uid, redirige al login
  return uid ? true : router.createUrlTree(['/login']);
};
