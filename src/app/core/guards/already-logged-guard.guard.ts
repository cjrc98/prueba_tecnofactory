// already-logged.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const alreadyLoggedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const uid = localStorage.getItem('uid');

  return uid ? router.createUrlTree(['/']) : true;
};
