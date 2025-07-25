import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-test-auth',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; font-family: Arial;">
      <h2>Test Auth0 Debug</h2>
      
      <div>
        <h3>Configuration actuelle:</h3>
        <p><strong>URL actuelle:</strong> {{ currentUrl }}</p>
        <p><strong>Domain:</strong> dev-2vkuwcv6a1sf1mai.us.auth0.com</p>
        <p><strong>Client ID:</strong> zYpaj12eaiypaC3EuXWzlMCjBTan8Nle</p>
      </div>

      <div>
        <h3>Test de redirection manuelle:</h3>
        <button (click)="testManualRedirect()" style="background: blue; color: white; padding: 10px; border: none; cursor: pointer;">
          Test Redirection Manuelle Auth0
        </button>
      </div>

      <div>
        <h3>Test avec SDK Auth0:</h3>
        <button (click)="testSDKLogin()" style="background: green; color: white; padding: 10px; border: none; cursor: pointer;">
          Test SDK Auth0
        </button>
      </div>

      <div *ngIf="isAuthenticated$ | async">
        <h3>✅ Utilisateur connecté !</h3>
        <button (click)="logout()" style="background: red; color: white; padding: 10px; border: none; cursor: pointer;">
          Se déconnecter
        </button>
      </div>
    </div>
  `
})
export class TestAuthComponent {
  currentUrl = window.location.href;

  constructor(public authService: AuthService) {}

  get isAuthenticated$() {
    return this.authService.isAuthenticated$;
  }

  testManualRedirect() {
    const authUrl = 'https://dev-2vkuwcv6a1sf1mai.us.auth0.com/authorize?' +
      'response_type=code&' +
      'client_id=zYpaj12eaiypaC3EuXWzlMCjBTan8Nle&' +
      'redirect_uri=' + encodeURIComponent('http://localhost:4200') + '&' +
      'scope=' + encodeURIComponent('openid profile email');
    
    console.log('🔗 URL de redirection manuelle:', authUrl);
    window.location.href = authUrl;
  }

  testSDKLogin() {
    console.log('🧪 Test avec SDK Auth0...');
    this.authService.loginWithRedirect({
      appState: { target: '/test' }
    }).subscribe({
      next: () => console.log('✅ SDK: Redirection initiée'),
      error: (err) => console.error('❌ SDK: Erreur', err)
    });
  }

  logout() {
    this.authService.logout({
      logoutParams: {
        returnTo: 'http://localhost:4200'
      }
    });
  }
}
