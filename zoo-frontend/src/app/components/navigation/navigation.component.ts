import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <div class="logo">🦁</div>
        <span class="brand-name">ZooTech</span>
        <span class="tagline">Gestion Moderne</span>
      </div>
      
      <div class="nav-links">
        <a routerLink="/animaux" routerLinkActive="active" class="nav-link">
          <mat-icon>pets</mat-icon>
          <span class="nav-text">Animaux</span>
        </a>
        <a routerLink="/enclos" routerLinkActive="active" class="nav-link">
          <mat-icon>home</mat-icon>
          <span class="nav-text">Enclos</span>
        </a>
        <a routerLink="/visites" routerLinkActive="active" class="nav-link">
          <mat-icon>confirmation_number</mat-icon>
          <span class="nav-text">Visites</span>
        </a>
      </div>
      
      <div class="nav-actions">
        <button mat-icon-button class="api-button">
          <mat-icon>api</mat-icon>
          <span>API Swagger</span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo {
      font-size: 2.5rem;
      animation: bounce 2s infinite;
    }

    .brand-name {
      font-size: 1.8rem;
      font-weight: 700;
      color: white;
    }

    .tagline {
      font-size: 0.9rem;
      color: rgba(255,255,255,0.8);
      font-style: italic;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
    }

    .nav-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      color: white;
      text-decoration: none;
      padding: 0.75rem 1.5rem;
      border-radius: 15px;
      font-weight: 500;
      transition: all 0.3s ease;
      background: rgba(255,255,255,0.1);
      min-width: 80px;
    }

    .nav-link:hover,
    .nav-link.active {
      background: rgba(255,255,255,0.2);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .nav-link mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
    }

    .nav-text {
      font-size: 0.9rem;
      font-weight: 600;
      color: white !important;
    }

    .api-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white !important;
      background: rgba(255,255,255,0.1) !important;
      border-radius: 20px !important;
      padding: 0.5rem 1rem !important;
      font-size: 0.9rem !important;
    }

    .api-button:hover {
      background: rgba(255,255,255,0.2) !important;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }

    @media (max-width: 768px) {
      .nav-links {
        gap: 1rem;
      }
      
      .nav-text {
        font-size: 0.8rem;
      }
      
      .tagline {
        display: none;
      }
    }
  `]
})
export class NavigationComponent {}