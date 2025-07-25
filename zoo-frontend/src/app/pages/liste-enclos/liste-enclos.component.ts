import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService } from '../../services/api.service';
import { AjoutEnclosDialogComponent } from '../../components/ajout-enclos-dialog/ajout-enclos-dialog.component';

interface Enclos {
  id: number;
  name: string;
  type: string;
  capacity: number;
  cleanliness: number;
}

@Component({
  selector: 'app-liste-enclos',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule
  ],
  template: `
  <div class="enclos-container fade-in">
    <!-- Bouton centré en haut comme pour les animaux -->
    <div class="add-button-container">
      <button mat-raised-button (click)="ouvrirDialogAjout()" class="add-button">
        <mat-icon>add</mat-icon>
        Nouvel Enclos
      </button>
    </div>

    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <span class="title-icon">🏠</span>
          Nos Enclos
        </h1>
        <p class="page-subtitle">Gérez et maintenez les habitats</p>
      </div>
    </div>

    <div class="enclos-grid">
      <div *ngFor="let enclos of enclosList" class="enclos-card" [class.dirty]="enclos.cleanliness < 50">
        <div class="card-header">
          <div class="enclos-avatar">
            <span class="enclos-emoji">{{getEnclosEmoji(enclos.type)}}</span>
          </div>
          <div class="cleanliness-indicator">
            <div class="cleanliness-bar">
              <div class="cleanliness-fill" [style.width.%]="enclos.cleanliness" 
                   [class.critical]="enclos.cleanliness < 30"
                   [class.warning]="enclos.cleanliness >= 30 && enclos.cleanliness < 70"
                   [class.good]="enclos.cleanliness >= 70"></div>
            </div>
            <span class="cleanliness-text">{{enclos.cleanliness}}%</span>
          </div>
        </div>
        
        <div class="card-content">
          <h3 class="enclos-name">{{enclos.name}}</h3>
          <p class="enclos-type">{{enclos.type}}</p>
          <div class="capacity-info">
            <mat-icon>group</mat-icon>
            <span>Capacité: {{enclos.capacity}} animaux</span>
          </div>
        </div>
        
        <div class="card-actions">
          <button mat-raised-button (click)="nettoyerEnclos(enclos.id)" 
                  [disabled]="enclos.cleanliness === 100" class="action-btn clean-btn">
            <mat-icon>cleaning_services</mat-icon>
            {{enclos.cleanliness === 100 ? 'Impeccable' : 'Nettoyer'}}
          </button>
          <button mat-raised-button (click)="supprimerEnclos(enclos.id)" 
                  class="action-btn delete-btn">
            <mat-icon>delete</mat-icon>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .enclos-container {
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
      background: linear-gradient(45deg, #8b4513, #cd853f) !important;
      color: white !important; /* TEXTE BLANC */
      font-size: 1.1rem !important;
      padding: 0.8rem 2rem !important;
      border-radius: 25px !important;
      font-weight: 600 !important;
      box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3) !important;
      transition: all 0.3s ease !important;
    }

    .add-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4) !important;
    }

    .add-button mat-icon {
      margin-right: 0.5rem;
      color: white !important; /* Icône blanche */
    }

    .page-header {
      background: white;
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      margin-bottom: 3rem;
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

    .fab-button {
      background: linear-gradient(45deg, var(--earth-brown), #cd853f) !important;
      color: white !important;
      border-radius: 25px !important;
      font-weight: 600 !important;
      padding: 0.5rem 2rem !important;
      font-size: 1rem !important;
      transition: all 0.3s ease !important;
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
    }

    .fab-button:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 25px rgba(139, 69, 19, 0.4) !important;
    }

    .enclos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .enclos-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      position: relative;
    }

    .enclos-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(45deg, var(--earth-brown), #cd853f);
    }

    .enclos-card.dirty::before {
      background: linear-gradient(45deg, #8b4513, #a0522d);
    }

    .enclos-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 45px rgba(0,0,0,0.15);
    }

    .card-header {
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .enclos-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--earth-brown), #cd853f);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .enclos-emoji {
      font-size: 2rem;
    }

    .cleanliness-indicator {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
    }

    .cleanliness-bar {
      width: 100px;
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }

    .cleanliness-fill {
      height: 100%;
      transition: all 0.3s ease;
      border-radius: 4px;
    }

    .cleanliness-fill.critical {
      background: linear-gradient(45deg, #8b4513, #a0522d);
    }

    .cleanliness-fill.warning {
      background: linear-gradient(45deg, #daa520, #f4a460);
    }

    .cleanliness-fill.good {
      background: linear-gradient(45deg, #32cd32, #90ee90);
    }

    .cleanliness-text {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--primary-green);
    }

    .card-content {
      padding: 0 1.5rem 1rem;
    }

    .enclos-name {
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--primary-green);
      margin: 0 0 0.5rem 0;
    }

    .enclos-type {
      color: #666;
      margin: 0 0 1rem 0;
      font-style: italic;
    }

    .capacity-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--earth-brown);
      font-weight: 500;
    }

    .capacity-info mat-icon {
      font-size: 1.2rem;
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

    .clean-btn {
      background: linear-gradient(45deg, #32cd32, #90ee90) !important;
      color: white !important;
    }

    .clean-btn:disabled {
      background: #e0e0e0 !important;
      color: #999 !important;
    }

    .delete-btn {
      background: linear-gradient(45deg, #f44336, #ff6b6b) !important;
      color: white !important;
    }

    .action-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .enclos-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ListeEnclosComponent implements OnInit {
  enclosList: Enclos[] = [];

  constructor(
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.chargerEnclos();
  }

  chargerEnclos(): void {
    this.api.get<Enclos[]>('/enclos').subscribe({
      next: (enclos) => {
        this.enclosList = enclos;
        console.log('Enclos chargés:', enclos);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des enclos:', err);
      }
    });
  }

  ouvrirDialogAjout(): void {
    const dialogRef = this.dialog.open(AjoutEnclosDialogComponent, {
      width: '500px',
      panelClass: 'modern-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.post<Enclos>('/enclos', result).subscribe({
          next: (enclos) => {
            console.log('Enclos ajouté avec succès:', enclos);
            this.chargerEnclos();
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout:', err);
            const newId = this.enclosList.length > 0 ? Math.max(...this.enclosList.map(e => e.id)) + 1 : 1;
            this.enclosList.push({
              id: newId,
              name: result.name,
              type: result.type,
              capacity: result.capacity,
              cleanliness: result.cleanliness
            });
          }
        });
      }
    });
  }

  nettoyerEnclos(id: number): void {
    console.log(`🧹 Frontend: Début nettoyage enclos ID: ${id}`);
    
    this.api.patch<Enclos>(`/enclos/${id}/nettoyer`, {}).subscribe({
      next: (enclos) => {
        console.log(`✅ Frontend: Enclos nettoyé:`, enclos);
        console.log(`🧽 Frontend: Nouvelle propreté: ${enclos.cleanliness}`);
        this.chargerEnclos();
      },
      error: (err) => {
        console.error(`❌ Frontend: Erreur nettoyage:`, err);
      }
    });
  }

  supprimerEnclos(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enclos ?')) {
      this.api.delete(`/enclos/${id}`).subscribe({
        next: () => {
          console.log(`Enclos ${id} supprimé`);
          this.chargerEnclos();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
        }
      });
    }
  }

  getEnclosEmoji(type: string): string {
    const emojis: { [key: string]: string } = {
      'savane': '🌾',
      'forêt': '🌲',
      'jungle': '🌿',
      'désert': '🏜️',
      'montagne': '🏔️',
      'aquarium': '🐠',
      'volière': '🦅',
      'arctique': '🧊',
      'tropical': '🌺',
      'prairie': '🌱',
      'marécage': '🦆',
      'grotte': '🗿',
      'extérieur': '🌞',
      'intérieur': '🏠',
      'aquatique': '💧'
    };
    
    const lowerType = type.toLowerCase();
    return emojis[lowerType] || '🏠';
  }
}