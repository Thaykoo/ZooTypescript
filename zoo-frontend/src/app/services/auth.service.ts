import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simule un utilisateur déjà connecté pour le développement
  private authStatusSubject = new BehaviorSubject<boolean>(true);
  isAuthenticated$ = this.authStatusSubject.asObservable();

  // Utilisateur simulé avec rôles
  private userSubject = new BehaviorSubject<any>({
    name: 'Utilisateur Test',
    roles: ['gardien', 'veterinaire']
  });
  user$ = this.userSubject.asObservable();

  constructor() {
    console.log('Auth service initialisé avec un utilisateur simulé');
  }

  // Simule une connexion (ne fait rien pour l'instant)
  login(): void {
    console.log('Tentative de connexion simulée');
    this.authStatusSubject.next(true);
  }

  // Simule une déconnexion
  logout(): void {
    console.log('Déconnexion simulée');
    this.authStatusSubject.next(false);
    // Pour tester la redirection, rechargez la page après 1 seconde
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  // Retourne un token factice
  getToken(): string {
    return 'fake-jwt-token';
  }
}