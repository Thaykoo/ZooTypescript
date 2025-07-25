import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { SoigneurDto } from '../../../dto/soigneur.dto';
import { AjoutSoigneurDialogComponent } from '../../components/ajout-soigneur-dialog/ajout-soigneur-dialog.component';

@Component({
  selector: 'app-liste-soigneurs',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  template: `
    <div class="container">
      <mat-card class="main-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>medical_services</mat-icon>
            Gestion des Soigneurs
          </mat-card-title>
          <mat-card-subtitle>Liste de tous les soigneurs du zoo</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="actions">
            <button mat-raised-button color="primary" (click)="ajouterSoigneur()">
              <mat-icon>add</mat-icon>
              Ajouter un soigneur
            </button>
          </div>

          <div class="table-container">
            <table mat-table [dataSource]="soigneurs" class="soigneurs-table">
              
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>ID</th>
                <td mat-cell *matCellDef="let soigneur">{{soigneur.id}}</td>
              </ng-container>

              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Nom</th>
                <td mat-cell *matCellDef="let soigneur">{{soigneur.name}}</td>
              </ng-container>

              <ng-container matColumnDef="specialite">
                <th mat-header-cell *matHeaderCellDef>Spécialité</th>
                <td mat-cell *matCellDef="let soigneur">{{soigneur.specialite}}</td>
              </ng-container>

              <ng-container matColumnDef="experience">
                <th mat-header-cell *matHeaderCellDef>Expérience</th>
                <td mat-cell *matCellDef="let soigneur">{{soigneur.experience}} ans</td>
              </ng-container>

              <ng-container matColumnDef="actif">
                <th mat-header-cell *matHeaderCellDef>Statut</th>
                <td mat-cell *matCellDef="let soigneur">
                  <span [class]="soigneur.actif ? 'status-actif' : 'status-inactif'">
                    {{soigneur.actif ? 'Actif' : 'Inactif'}}
                  </span>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      background: linear-gradient(135deg, #e8f5e8, #f0f9f0);
      min-height: 100vh;
    }

    .main-card {
      max-width: 1200px;
      margin: 0 auto;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }

    mat-card-header {
      background: linear-gradient(135deg, #4caf50, #66bb6a);
      color: white;
      padding: 2rem;
      border-radius: 16px 16px 0 0;
      margin: -24px -24px 24px -24px;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.5rem;
      color: white !important;
    }

    mat-card-subtitle {
      color: rgba(255,255,255,0.9) !important;
      margin-top: 0.5rem;
    }

    .actions {
      margin-bottom: 2rem;
      display: flex;
      justify-content: flex-end;
    }

    .table-container {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }

    .soigneurs-table {
      width: 100%;
      background: white;
    }

    .mat-mdc-header-cell {
      background: #f5f5f5;
      font-weight: 600;
      color: #333;
    }

    .mat-mdc-cell {
      padding: 1rem;
    }

    .status-actif {
      background: #e8f5e8;
      color: #2e7d32;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-weight: 600;
    }

    .status-inactif {
      background: #ffebee;
      color: #c62828;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-weight: 600;
    }
  `]
})
export class ListeSoigneursComponent implements OnInit {
  soigneurs: SoigneurDto[] = [];
  displayedColumns: string[] = ['id', 'name', 'specialite', 'experience', 'actif'];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.chargerSoigneurs();
  }

  chargerSoigneurs() {
    this.apiService.getSoigneurs().subscribe({
      next: (soigneurs) => {
        this.soigneurs = soigneurs;
        console.log('Soigneurs chargés:', soigneurs);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des soigneurs:', error);
      }
    });
  }

  ajouterSoigneur() {
    const dialogRef = this.dialog.open(AjoutSoigneurDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.createSoigneur(result).subscribe({
          next: (nouveauSoigneur) => {
            console.log('Nouveau soigneur créé:', nouveauSoigneur);
            this.chargerSoigneurs(); // Recharger la liste
          },
          error: (error) => {
            console.error('Erreur lors de la création du soigneur:', error);
          }
        });
      }
    });
  }
}
