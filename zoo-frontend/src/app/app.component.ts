import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <nav style="background-color: #3f51b5; color: white; padding: 1rem;">
      <h1 style="margin: 0; display: inline-block;">🦁 Zoo</h1>
      <div style="display: inline-block; margin-left: 2rem;">
        <a (click)="navigateTo('/animaux')" style="color: white; margin-right: 1rem; cursor: pointer;">Animaux</a>
        <a (click)="navigateTo('/enclos')" style="color: white; margin-right: 1rem; cursor: pointer;">Enclos</a>
        <a (click)="navigateTo('/visites')" style="color: white; cursor: pointer;">Visites</a>
      </div>
    </nav>
    <router-outlet />
  `,
  styles: []
})
export class AppComponent implements OnInit {
  username: string | undefined;
  backendUrl = 'http://localhost:3000';

  constructor(
    public auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      console.log('👤 User:', user);
      this.username = user?.name;
    });
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  testCallApi() {
    this.auth.getAccessTokenSilently().subscribe((token) => {
      console.log('🔑 Access Token:', token);

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get(`${this.backendUrl}/animaux/1`, { headers }).subscribe({
        next: (data) => {
          console.log('🐾 Réponse API:', data);
          // Ajouter cette ligne pour afficher la réponse
          alert('API test successful! Response: ' + JSON.stringify(data));
        },
        error: (error) => {
          console.error('❌ Erreur API:', error);
          // Ajouter cette ligne pour afficher l'erreur
          alert('API test failed! Error: ' + JSON.stringify(error.message));
        },
      });
    });
  }
}
