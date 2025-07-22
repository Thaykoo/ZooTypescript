import { Routes } from '@angular/router';
import { ListeAnimauxComponent } from './pages/liste-animaux/liste-animaux.component';
import { ListeEnclosComponent } from './pages/liste-enclos/liste-enclos.component';
import { ListeVisitesComponent } from './pages/liste-visites/liste-visites.component';

export const routes: Routes = [
  { path: '', redirectTo: '/animaux', pathMatch: 'full' },
  { path: 'animaux', component: ListeAnimauxComponent },
  { path: 'enclos', component: ListeEnclosComponent },
  { path: 'visites', component: ListeVisitesComponent },
];
