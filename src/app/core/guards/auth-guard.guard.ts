// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // En SSR no hay localStorage → deja pasar y el cliente hará el redirect si toca
  if (!isPlatformBrowser(platformId)) return true;

  const uid = localStorage.getItem('uid');
  return uid ? true : router.createUrlTree(['/login']);
};
