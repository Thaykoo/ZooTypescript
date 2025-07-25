import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  template: `
    <div class="login-container" *ngIf="!(authService.isAuthenticated$ | async)">
      <div class="login-card">
        <div class="login-header">
          <mat-icon class="zoo-icon">pets</mat-icon>
          <h1>Zoo TypeScript</h1>
          <p>Système de gestion du zoo</p>
        </div>
        
        <div class="login-content">
          <h2>Connexion requise</h2>
          <p>Veuillez vous connecter pour accéder au système de gestion du zoo.</p>
          
          <button mat-raised-button color="primary" (click)="login()" class="login-btn">
            <mat-icon>login</mat-icon>
            Se connecter
          </button>
          
          <!-- Bouton de test direct -->
          <button mat-raised-button color="accent" (click)="testDirectAuth0()" class="test-btn" style="margin-top: 10px;">
            <mat-icon>open_in_new</mat-icon>
            Test Authentification Auth0
          </button>
        </div>
        
        <div class="login-footer">
          <p>Rôles disponibles : Gardien, Vétérinaire, Administrateur</p>
        </div>
      </div>
    </div>

    <!-- Header pour utilisateur connecté -->
    <mat-toolbar color="primary" *ngIf="authService.isAuthenticated$ | async" class="app-header">
      <div class="header-content">
        <div class="header-left">
          <mat-icon class="zoo-icon">pets</mat-icon>
          <span class="app-title">Zoo TypeScript</span>
        </div>
        
        <div class="header-right">
          <div class="user-info" *ngIf="authService.user$ | async as user">
            <img [src]="user.picture" [alt]="user.name" class="user-avatar" *ngIf="user.picture">
            <span class="user-name">{{user.name}}</span>
            <span class="user-role">Utilisateur</span>
          </div>
          
          <button mat-icon-button [matMenuTriggerFor]="userMenu">
            <mat-icon>account_circle</mat-icon>
          </button>
          
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item (click)="navigateTo('/animaux')">
              <mat-icon>pets</mat-icon>
              <span>Animaux</span>
            </button>
            <button mat-menu-item (click)="navigateTo('/enclos')">
              <mat-icon>home</mat-icon>
              <span>Enclos</span>
            </button>
            <button mat-menu-item (click)="navigateTo('/visites')">
              <mat-icon>visibility</mat-icon>
              <span>Visites</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Déconnexion</span>
            </button>
          </mat-menu>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
    }

    .login-card {
      background: white;
      border-radius: 20px;
      padding: 3rem;
      box-shadow: 0 20px 60px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    .login-header {
      margin-bottom: 2rem;
    }

    .zoo-icon {
      font-size: 4rem !important;
      width: 4rem !important;
      height: 4rem !important;
      color: #667eea;
      margin-bottom: 1rem;
    }

    .login-header h1 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 2rem;
      font-weight: 600;
    }

    .login-header p {
      margin: 0;
      color: #666;
      font-size: 1rem;
    }

    .login-content {
      margin-bottom: 2rem;
    }

    .login-content h2 {
      margin: 0 0 1rem 0;
      color: #333;
      font-size: 1.5rem;
    }

    .login-content p {
      margin: 0 0 2rem 0;
      color: #666;
      line-height: 1.5;
    }

    .login-btn {
      background: linear-gradient(45deg, #667eea, #764ba2) !important;
      color: white !important;
      padding: 0.75rem 2rem !important;
      font-size: 1.1rem !important;
      font-weight: 600 !important;
      border-radius: 25px !important;
      min-width: 200px;
    }

    .login-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .login-footer {
      border-top: 1px solid #eee;
      padding-top: 1rem;
      margin-top: 2rem;
    }

    .login-footer p {
      margin: 0;
      color: #999;
      font-size: 0.9rem;
    }

    /* Header styles */
    .app-header {
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .header-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .header-left .zoo-icon {
      font-size: 2rem !important;
      width: 2rem !important;
      height: 2rem !important;
      color: white;
    }

    .app-title {
      font-size: 1.5rem;
      font-weight: 600;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid white;
    }

    .user-name {
      color: white;
      font-weight: 500;
    }

    .user-role {
      background: rgba(255,255,255,0.2);
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      color: white;
    }
  `]
})
export class LoginComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    // Debug Auth0 à l'initialisation
    console.log('=== AUTH0 INIT DEBUG ===');
    
    // Gestion du loading
    this.authService.isLoading$.subscribe(loading => {
      console.log('Auth0 Loading:', loading);
    });
    
    // Gestion des erreurs
    this.authService.error$.subscribe(error => {
      if (error) {
        console.error('❌ Auth0 Error:', error);
      }
    });
    
    // On ne fait plus de redirection automatique ici
    // C'est le CallbackComponent qui s'en charge
    this.authService.isAuthenticated$.subscribe(isAuth => {
      console.log('Auth0 isAuthenticated:', isAuth);
    });
  }

  login(): void {
    console.log('=== CONNEXION AUTH0 ===');
    console.log('🚀 Redirection vers Auth0...');
    
    // Utilise le SDK Auth0 Angular pour une connexion propre
    this.authService.loginWithRedirect({
      appState: { target: '/animaux' }
    });
  }

  testDirectAuth0(): void {
    console.log('🧪 Test connexion Auth0...');
    this.authService.loginWithRedirect({
      appState: { target: '/enclos' }
    });
  }

  logout(): void {
    this.authService.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
