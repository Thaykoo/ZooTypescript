import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'callback',
    loadComponent: () => import('./components/callback/callback.component').then(m => m.CallbackComponent)
  },
  {
    path: 'test-auth',
    loadComponent: () => import('./test-auth.component').then(m => m.TestAuthComponent)
  },
  { 
    path: 'animaux', 
    loadComponent: () => import('./pages/liste-animaux/liste-animaux.component').then(m => m.ListeAnimauxComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'enclos', 
    loadComponent: () => import('./pages/liste-enclos/liste-enclos.component').then(m => m.ListeEnclosComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'visites', 
    loadComponent: () => import('./pages/liste-visites/liste-visites.component').then(m => m.ListeVisitesComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'soigneurs', 
    loadComponent: () => import('./pages/liste-soigneurs/liste-soigneurs.component').then(m => m.ListeSoigneursComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  { path: '**', redirectTo: '/' }
];
