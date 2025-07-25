import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService } from '../../services/api.service';
import { AjoutAnimalDialogComponent } from '../../components/ajout-animal-dialog/ajout-animal-dialog.component';

interface Animal {
  id: number;
  name: string;
  species: string;
  health: number;
}

@Component({
  selector: 'app-liste-animaux',
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
    <div class="animaux-container fade-in">
      <!-- Bouton d'ajout fixe en haut -->
      <div class="add-button-container">
        <button mat-raised-button color="primary" (click)="ouvrirDialogAjout()" class="add-button">
          <mat-icon>add</mat-icon>
          Ajouter un Animal
        </button>
      </div>

      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            <span class="title-icon">🦁</span>
            Nos Animaux
          </h1>
          <p class="page-subtitle">Gérez et surveillez tous vos compagnons</p>
        </div>
      </div>

      <div class="animals-grid">
        <div *ngFor="let animal of animaux" class="animal-card" [class.sick]="animal.health < 50">
          <div class="card-header">
            <div class="animal-avatar">
              <span class="animal-emoji">{{getAnimalEmoji(animal.species)}}</span>
            </div>
            <div class="health-indicator">
              <div class="health-bar">
                <div class="health-fill" [style.width.%]="animal.health" 
                     [class.critical]="animal.health < 30"
                     [class.warning]="animal.health >= 30 && animal.health < 70"
                     [class.good]="animal.health >= 70"></div>
              </div>
              <span class="health-text">{{animal.health}}%</span>
            </div>
          </div>
          
          <div class="card-content">
            <h3 class="animal-name">{{animal.name}}</h3>
            <p class="animal-species">{{animal.species}}</p>
          </div>
          
          <div class="card-actions">
            <button mat-raised-button (click)="soignerAnimal(animal.id)" 
                    [disabled]="animal.health === 100" class="action-btn heal-btn">
              <mat-icon>healing</mat-icon>
              {{animal.health === 100 ? 'En pleine forme' : 'Soigner'}}
            </button>
            <button mat-raised-button (click)="supprimerAnimal(animal.id)" 
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
  .animaux-container {
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
    background: linear-gradient(45deg, #ff6b35, #f7931e) !important;
    color: #000 !important; /* TEXTE NOIR */
    font-size: 1.1rem !important;
    padding: 0.8rem 2rem !important;
    border-radius: 25px !important;
    font-weight: 700 !important; /* Plus gras pour la visibilité */
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3) !important;
    transition: all 0.3s ease !important;
    text-shadow: 1px 1px 2px rgba(255,255,255,0.5) !important; /* Ombre blanche pour contraste */
  }

  .add-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4) !important;
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
    text-align: center;
  }

  .animals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }

  .animal-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    position: relative;
  }

  .animal-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(45deg, var(--secondary-green), var(--light-green));
  }

  .animal-card.sick::before {
    background: linear-gradient(45deg, #ff4444, #ff6b6b);
  }

  .animal-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 45px rgba(0,0,0,0.15);
  }

  .card-header {
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .animal-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--light-green), var(--secondary-green));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .animal-emoji {
    font-size: 2rem;
  }

  .health-indicator {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .health-bar {
    width: 100px;
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
  }

  .health-fill {
    height: 100%;
    transition: all 0.3s ease;
    border-radius: 4px;
  }

  .health-fill.critical {
    background: linear-gradient(45deg, #ff4444, #ff6b6b);
  }

  .health-fill.warning {
    background: linear-gradient(45deg, #ffa500, #ffcc00);
  }

  .health-fill.good {
    background: linear-gradient(45deg, #4caf50, #8bc34a);
  }

  .health-text {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-green);
  }

  .card-content {
    padding: 0 1.5rem 1rem;
  }

  .animal-name {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--primary-green);
    margin: 0 0 0.5rem 0;
  }

  .animal-species {
    color: #666;
    margin: 0;
    font-style: italic;
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

  .heal-btn {
    background: linear-gradient(45deg, #4caf50, #8bc34a) !important;
    color: white !important;
  }

  .heal-btn:disabled {
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
    .animals-grid {
      grid-template-columns: 1fr;
    }
  }
  `]
})
export class ListeAnimauxComponent implements OnInit {
  animaux: Animal[] = [];

  constructor(
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.chargerAnimaux();
  }

  chargerAnimaux(): void {
    this.api.get<Animal[]>('/animaux').subscribe({
      next: (animaux) => {
        this.animaux = animaux;
        console.log('Animaux chargés:', animaux);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des animaux:', err);
      }
    });
  }

  ouvrirDialogAjout(): void {
    const dialogRef = this.dialog.open(AjoutAnimalDialogComponent, {
      width: '500px',
      panelClass: 'modern-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.post<Animal>('/animaux', result).subscribe({
          next: (animal) => {
            console.log('Animal ajouté avec succès:', animal);
            this.chargerAnimaux();
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout:', err);
            const newId = this.animaux.length > 0 ? Math.max(...this.animaux.map(a => a.id)) + 1 : 1;
            this.animaux.push({
              id: newId,
              name: result.name,
              species: result.species,
              health: result.health
            });
          }
        });
      }
    });
  }

  soignerAnimal(id: number): void {
    console.log(`🩺 Frontend: Début soins animal ID: ${id}`);
    console.log(`🌐 Frontend: URL appelée: /animaux/${id}/soigner`);
    
    this.api.get<Animal>(`/animaux/${id}/soigner`).subscribe({
      next: (animal) => {
        console.log(`✅ Frontend: Animal soigné:`, animal);
        console.log(`💚 Frontend: Nouvelle santé: ${animal.health}`);
        console.log(`🔄 Frontend: Rechargement de la liste...`);
        this.chargerAnimaux();
      },
      error: (err) => {
        console.error(`❌ Frontend: Erreur soins:`, err);
        console.error(`📊 Frontend: Status HTTP:`, err.status);
        console.error(`💬 Frontend: Message:`, err.error);
      }
    });
  }

  supprimerAnimal(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet animal ?')) {
      this.api.delete(`/animaux/${id}`).subscribe({
        next: () => {
          console.log(`Animal ${id} supprimé`);
          this.chargerAnimaux();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
        }
      });
    }
  }

  getAnimalEmoji(species: string): string {
    const emojis: { [key: string]: string } = {
      'lion': '🦁',
      'éléphant': '🐘',
      'girafe': '🦒',
      'pingouin': '🐧',
      'tigre': '🐅',
      'ours': '🐻',
      'singe': '🐒',
      'zèbre': '🦓',
      'kangourou': '🦘',
      'panda': '🐼',
      'loup': '🐺',
      'renard': '🦊',
      'aigle': '🦅',
      'perroquet': '🦜',
      'serpent': '🐍',
      'tortue': '🐢',
      'crocodile': '🐊',
      'requin': '🦈',
      'dauphin': '🐬',
      'baleine': '🐋',
      'félin': '🐱',
      'canidé': '🐕',
      'oiseau': '🐦',
      'reptile': '🦎',
      'poisson': '🐠'
    };
    
    const lowerSpecies = species.toLowerCase();
    return emojis[lowerSpecies] || '🐾';
  }
}
