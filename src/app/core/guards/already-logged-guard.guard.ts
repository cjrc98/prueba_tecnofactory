import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const alreadyLoggedGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    const uid = localStorage.getItem('uid');
    return uid ? router.createUrlTree(['/']) : true;
  }

  return true;
};
