import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: `
    <div style="text-align: center; padding: 50px; font-family: Arial;">
      <h2>🔄 Connexion en cours...</h2>
      <p>Veuillez patienter pendant que nous vous connectons.</p>
      <div style="margin-top: 20px;">
        <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </div>
  `
})
export class CallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('🔄 CallbackComponent initialisé');
    
    // Attendre que l'authentification soit terminée
    this.authService.isLoading$.pipe(
      filter(loading => !loading), // Attendre que le loading soit fini
      take(1)
    ).subscribe(() => {
      console.log('✅ Loading terminé, vérification de l\'authentification...');
      
      this.authService.isAuthenticated$.pipe(take(1)).subscribe(isAuth => {
        if (isAuth) {
          console.log('🎉 Utilisateur authentifié ! Redirection vers /animaux');
          setTimeout(() => {
            this.router.navigate(['/animaux']);
          }, 1000); // Petit délai pour laisser le temps au SDK de se stabiliser
        } else {
          console.log('❌ Échec de l\'authentification, retour à l\'accueil');
          this.router.navigate(['/']);
        }
      });
    });

    // Gestion des erreurs
    this.authService.error$.subscribe(error => {
      if (error) {
        console.error('❌ Erreur d\'authentification:', error);
        alert('Erreur de connexion: ' + error.message);
        this.router.navigate(['/']);
      }
    });
  }
}
