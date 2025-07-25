import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 80px);
      background: linear-gradient(135deg, #f8fffe 0%, #f0f9ff 100%);
    }
  `]
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
