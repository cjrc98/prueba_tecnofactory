import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { alreadyLoggedGuard } from './core/guards/user.guard';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'comic',
        loadChildren: () =>
          import('./features/comic-details/comics-details.routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./features/favorite/favorite.routes').then((m) => m.routes),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/user/user.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '',
    loadChildren: () => import('./Auth/auth.routes').then((m) => m.routes),
    canActivate: [alreadyLoggedGuard],
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
