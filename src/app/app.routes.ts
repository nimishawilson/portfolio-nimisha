import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./pages/project-detail/project-detail').then(m => m.ProjectDetail),
  },
  {
    path: 'deep-dives/:slug',
    loadComponent: () =>
      import('./pages/deep-dive-detail/deep-dive-detail').then(m => m.DeepDiveDetail),
  },
  {
    path: '**',
    redirectTo: '',
  },
];