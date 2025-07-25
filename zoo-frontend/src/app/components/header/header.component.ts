import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <header class="zoo-header">
      <div class="header-content">
        <div class="logo-section">
          <div class="logo-icon">🦁</div>
          <div class="logo-text">
            <h1>ZooTech</h1>
            <span>Gestion Moderne</span>
          </div>
        </div>
        
        <nav class="nav-menu">
          <a routerLink="/animaux" routerLinkActive="active" class="nav-item">
            <mat-icon>pets</mat-icon>
            <span>Animaux</span>
          </a>
          <a routerLink="/enclos" routerLinkActive="active" class="nav-item">
            <mat-icon>home</mat-icon>
            <span>Enclos</span>
          </a>
          <a routerLink="/visites" routerLinkActive="active" class="nav-item">
            <mat-icon>group</mat-icon>
            <span>Visites</span>
          </a>
          <a routerLink="/soigneurs" routerLinkActive="active" class="nav-item">
            <mat-icon>medical_services</mat-icon>
            <span>Soigneurs</span>
          </a>
        </nav>
        
        <div class="header-actions">
          <a href="http://localhost:3001/api" target="_blank" mat-raised-button color="primary" class="cta-button">
            <mat-icon>api</mat-icon>
            Swagger API
          </a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .zoo-header {
      background: linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%);
      box-shadow: 0 4px 20px var(--shadow);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo-icon {
      font-size: 3rem;
      animation: bounce 3s infinite;
    }

    .logo-text h1 {
      color: var(--white);
      font-weight: 700;
      font-size: 1.8rem;
      margin: 0;
    }

    .logo-text span {
      color: var(--accent-yellow);
      font-size: 0.9rem;
      font-weight: 500;
    }

    .nav-menu {
      display: flex;
      gap: 2rem;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: var(--white);
      padding: 0.5rem 1rem;
      border-radius: 12px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .nav-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .nav-item:hover::before {
      left: 100%;
    }

    .nav-item:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    .nav-item.active {
      background: var(--accent-orange);
      color: var(--white);
    }

    .nav-item mat-icon {
      font-size: 1.5rem;
      margin-bottom: 0.25rem;
    }

    .nav-item span {
      font-size: 0.85rem;
      font-weight: 500;
    }

    .cta-button {
      background: var(--accent-orange) !important;
      color: var(--white) !important;
      border-radius: 25px !important;
      padding: 0.5rem 1.5rem !important;
      font-weight: 600 !important;
      transition: all 0.3s ease !important;
      text-decoration: none !important;
    }

    .cta-button:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
      }
      
      .nav-menu {
        gap: 1rem;
      }
    }
  `]
})
export class HeaderComponent {}