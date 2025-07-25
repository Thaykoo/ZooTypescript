import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="callback-container">
      <div class="callback-content">
        <mat-spinner diameter="60"></mat-spinner>
        <h2>Connexion en cours...</h2>
        <p>Nous finalisons votre authentification, veuillez patienter.</p>
        
        <!-- Message d'erreur si besoin -->
        <div class="error-message" *ngIf="errorMessage">
          <mat-icon color="warn">error</mat-icon>
          <p>{{ errorMessage }}</p>
          <button mat-raised-button color="primary" (click)="retryLogin()">
            Réessayer
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .callback-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
    }

    .callback-content {
      background: white;
      border-radius: 20px;
      padding: 3rem;
      box-shadow: 0 20px 60px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    .callback-content h2 {
      margin: 1.5rem 0 1rem 0;
      color: #333;
      font-size: 1.5rem;
    }

    .callback-content p {
      margin: 0 0 2rem 0;
      color: #666;
      line-height: 1.5;
    }

    .error-message {
      margin-top: 2rem;
      padding: 1rem;
      background: #ffebee;
      border-radius: 8px;
      border-left: 4px solid #f44336;
    }

    .error-message mat-icon {
      margin-bottom: 0.5rem;
    }

    .error-message p {
      color: #d32f2f;
      margin: 0.5rem 0;
    }
  `]
})
export class CallbackComponent implements OnInit {
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('🔄 CallbackComponent - Traitement du retour Auth0');
    
    // Écouter l'appState pour la redirection cible
    this.authService.appState$.subscribe(appState => {
      console.log('📍 AppState reçu:', appState);
      
      if (appState?.target) {
        console.log(`✅ Redirection vers: ${appState.target}`);
        this.router.navigate([appState.target]);
      } else {
        // Si pas de target spécifique, aller aux animaux par défaut
        console.log('🦁 Redirection par défaut vers /animaux');
        this.router.navigate(['/animaux']);
      }
    });

    // Surveiller les erreurs
    this.authService.error$.subscribe(error => {
      if (error) {
        console.error('❌ Erreur Auth0 dans callback:', error);
        this.errorMessage = 'Erreur lors de l\'authentification. Veuillez réessayer.';
      }
    });

    // Vérifier l'état d'authentification après un délai
    setTimeout(() => {
      this.authService.isAuthenticated$.pipe(take(1)).subscribe(isAuth => {
        console.log('🔍 État authentification final:', isAuth);
        
        if (!isAuth) {
          console.log('❌ Échec authentification, retour au login');
          this.errorMessage = 'Authentification échouée. Retour au login...';
          setTimeout(() => this.router.navigate(['/']), 2000);
        }
      });
    }, 2000);
  }

  retryLogin(): void {
    this.router.navigate(['/']);
  }
}
