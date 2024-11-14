import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '', loadChildren: () => import('./authorized/authorized.routes') },

  {
    path: '',
    loadChildren: () => import('./unauthorized/unauthorized.routes'),
  },

  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
