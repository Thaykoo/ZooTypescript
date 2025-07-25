import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService } from '../../services/api.service';
import { AjoutVisiteDialogComponent } from '../../components/ajout-visite-dialog/ajout-visite-dialog.component';

interface Visite {
  id: number;
  visiteurNom: string;
  visiteurEmail: string;
  nombrePersonnes: number;
  dateVisite: string;
  prix: number;
  commentaire?: string;
}

@Component({
  selector: 'app-liste-visites',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule
  ],
  template: `
  <div class="visites-container fade-in">
    <!-- Bouton d'ajout fixe en haut -->
    <div class="add-button-container">
      <button mat-raised-button color="primary" (click)="ouvrirDialogAjout()" class="add-button">
        <mat-icon>add</mat-icon>
        Ajouter une Visite
      </button>
    </div>

    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <span class="title-icon">🎫</span>
          Nos Visites
        </h1>
        <p class="page-subtitle">Gérez les visiteurs et réservations</p>
      </div>
    </div>

    <div class="visites-grid">
      <div *ngFor="let visite of visites" class="visite-card">
        <div class="card-header">
          <div class="visitor-avatar">
            <span class="visitor-emoji">👥</span>
          </div>
          <div class="visit-status">
            <mat-chip-set>
              <mat-chip [class]="getPriceClass(visite.prix)">
                {{visite.prix | currency:'EUR':'symbol':'1.2-2'}}
              </mat-chip>
            </mat-chip-set>
          </div>
        </div>
        
        <div class="card-content">
          <h3 class="visitor-name">{{visite.visiteurNom}}</h3>
          <p class="visitor-email">
            <mat-icon>email</mat-icon>
            {{visite.visiteurEmail}}
          </p>
          <div class="visit-details">
            <div class="detail-item">
              <mat-icon>group</mat-icon>
              <span>{{visite.nombrePersonnes}} personne{{visite.nombrePersonnes > 1 ? 's' : ''}}</span>
            </div>
            <div class="detail-item">
              <mat-icon>calendar_today</mat-icon>
              <span>{{formatDate(visite.dateVisite)}}</span>
            </div>
          </div>
          <div *ngIf="visite.commentaire" class="comment-section">
            <p class="comment-text">
              <mat-icon>comment</mat-icon>
              "{{visite.commentaire}}"
            </p>
          </div>
        </div>
        
        <div class="card-actions">
          <button mat-raised-button (click)="modifierVisite(visite)" class="action-btn edit-btn">
            <mat-icon>edit</mat-icon>
            Modifier
          </button>
          <button mat-raised-button (click)="supprimerVisite(visite.id)" class="action-btn delete-btn">
            <mat-icon>delete</mat-icon>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .visites-container {
      padding: 2rem;
      background: linear-gradient(135deg, #f8fffe 0%, #f0f9ff 100%);
      min-height: 100vh;
    }

    .add-button-container {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .add-button {
      background: linear-gradient(45deg, #87ceeb, #4fc3f7) !important;
      color: #000 !important; /* TEXTE NOIR */
      font-size: 1.1rem !important;
      padding: 0.8rem 2rem !important;
      border-radius: 25px !important;
      font-weight: 700 !important; /* Plus gras pour la visibilité */
      box-shadow: 0 4px 15px rgba(135, 206, 235, 0.3) !important;
      transition: all 0.3s ease !important;
      text-shadow: 1px 1px 2px rgba(255,255,255,0.5) !important; /* Ombre blanche pour contraste */
    }

    .add-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4) !important;
    }

    .add-button mat-icon {
      margin-right: 0.5rem;
      color: #000 !important; /* Icône noire aussi */
    }

    .page-header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 3rem;
      background: white;
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }

    .page-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary-green);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .title-icon {
      font-size: 3rem;
      animation: bounce 2s infinite;
    }

    .page-subtitle {
      color: #666;
      font-size: 1.1rem;
      margin: 0.5rem 0 0 0;
    }

    .visites-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 2rem;
    }

    .visite-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      position: relative;
    }

    .visite-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(45deg, var(--sky-blue), #4fc3f7);
    }

    .visite-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 45px rgba(0,0,0,0.15);
    }

    .card-header {
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .visitor-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--sky-blue), #4fc3f7);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .visitor-emoji {
      font-size: 1.8rem;
    }

    .visit-status mat-chip {
      font-weight: 600;
      border-radius: 12px;
    }

    .price-low {
      background: #e8f5e8 !important;
      color: #2e7d32 !important;
    }

    .price-medium {
      background: #fff3e0 !important;
      color: #f57c00 !important;
    }

    .price-high {
      background: #fce4ec !important;
      color: #c2185b !important;
    }

    .card-content {
      padding: 0 1.5rem 1rem;
    }

    .visitor-name {
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--primary-green);
      margin: 0 0 0.5rem 0;
    }

    .visitor-email {
      color: #666;
      margin: 0 0 1rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
    }

    .visitor-email mat-icon {
      font-size: 1.1rem;
      color: var(--sky-blue);
    }

    .visit-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary-green);
      font-weight: 500;
      font-size: 0.9rem;
    }

    .detail-item mat-icon {
      font-size: 1.1rem;
      color: var(--sky-blue);
    }

    .comment-section {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 12px;
      margin-top: 1rem;
    }

    .comment-text {
      margin: 0;
      font-style: italic;
      color: #666;
      font-size: 0.9rem;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .comment-text mat-icon {
      font-size: 1rem;
      color: var(--sky-blue);
      margin-top: 0.1rem;
    }

    .card-actions {
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
    }

    .action-btn {
      flex: 1;
      border-radius: 12px !important;
      font-weight: 600 !important;
      transition: all 0.3s ease !important;
    }

    .edit-btn {
      background: linear-gradient(45deg, var(--sky-blue), #4fc3f7) !important;
      color: white !important;
    }

    .delete-btn {
      background: linear-gradient(45deg, #f44336, #ff6b6b) !important;
      color: white !important;
    }

    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .visites-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ListeVisitesComponent implements OnInit {
  visites: Visite[] = [];

  constructor(
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.chargerVisites();
  }

  chargerVisites(): void {
    this.api.get<Visite[]>('/visites').subscribe({
      next: (visites) => {
        this.visites = visites;
        console.log('Visites chargées:', visites);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des visites:', err);
      }
    });
  }

  ouvrirDialogAjout(): void {
    const dialogRef = this.dialog.open(AjoutVisiteDialogComponent, {
      width: '600px',
      panelClass: 'modern-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.post<Visite>('/visites', result).subscribe({
          next: (visite) => {
            console.log('Visite ajoutée avec succès:', visite);
            this.chargerVisites();
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout:', err);
            const newId = this.visites.length > 0 ? Math.max(...this.visites.map(v => v.id)) + 1 : 1;
            this.visites.push({
              id: newId,
              ...result,
              dateVisite: result.dateVisite || new Date().toISOString()
            });
          }
        });
      }
    });
  }

  modifierVisite(visite: Visite): void {
    console.log('Modifier visite:', visite);
    // Logique de modification à implémenter
  }

  supprimerVisite(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette visite ?')) {
      this.api.delete(`/visites/${id}`).subscribe({
        next: () => {
          console.log(`Visite ${id} supprimée`);
          this.chargerVisites();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  getPriceClass(prix: number): string {
    if (prix < 20) return 'price-low';
    if (prix < 50) return 'price-medium';
    return 'price-high';
  }
}
