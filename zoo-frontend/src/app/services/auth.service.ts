import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  sub: string;
  name?: string;
  email?: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.authStatusSubject.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private readonly AUTH0_DOMAIN = 'dev-2vkuwcv6a1sf1mai.us.auth0.com';
  private readonly AUTH0_CLIENT_ID = 'zYpaj72easiypac3EuXWrlMCj8TanaN1e';
  private readonly AUTH0_AUDIENCE = 'zoo-api';
  private readonly REDIRECT_URI = window.location.origin + '/callback';

  constructor() {
    this.checkAuthStatus();
  }

  // Vérification du statut d'authentification au démarrage
  private checkAuthStatus(): void {
    const token = this.getTokenFromStorage();
    if (token && !this.isTokenExpired(token)) {
      const user = this.getUserFromToken(token);
      if (user) {
        this.authStatusSubject.next(true);
        this.userSubject.next(user);
      }
    }
  }

  // Redirection vers Auth0 pour connexion
  login(): void {
    const authUrl = `https://${this.AUTH0_DOMAIN}/authorize?` +
      `response_type=code&` +
      `client_id=${this.AUTH0_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(this.REDIRECT_URI)}&` +
      `scope=openid profile email&` +
      `audience=${this.AUTH0_AUDIENCE}`;
    
    window.location.href = authUrl;
  }

  // Déconnexion réelle
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    this.authStatusSubject.next(false);
    this.userSubject.next(null);

    // Redirection vers Auth0 logout
    const logoutUrl = `https://${this.AUTH0_DOMAIN}/v2/logout?` +
      `client_id=${this.AUTH0_CLIENT_ID}&` +
      `returnTo=${encodeURIComponent(window.location.origin)}`;
    
    window.location.href = logoutUrl;
  }

  // Récupération du token JWT réel
  getToken(): string | null {
    return this.getTokenFromStorage();
  }

  // Traitement du callback Auth0
  handleCallback(code: string): Promise<void> {
    return fetch('/api/auth/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code })
    })
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        const user = this.getUserFromToken(data.access_token);
        if (user) {
          localStorage.setItem('user_info', JSON.stringify(user));
          this.authStatusSubject.next(true);
          this.userSubject.next(user);
        }
      }
    })
    .catch(error => {
      console.error('Erreur lors du traitement du callback:', error);
      throw error;
    });
  }

  // Vérification des rôles
  hasRole(role: string): boolean {
    const user = this.userSubject.value;
    return user ? user.roles.includes(role) : false;
  }

  // Méthodes utilitaires privées
  private getTokenFromStorage(): string | null {
    return localStorage.getItem('access_token');
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() >= exp;
    } catch {
      return true;
    }
  }

  private getUserFromToken(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        sub: payload.sub,
        name: payload.name,
        email: payload.email,
        roles: payload['https://zoo-app.com/roles'] || []
      };
    } catch {
      return null;
    }
  }
}