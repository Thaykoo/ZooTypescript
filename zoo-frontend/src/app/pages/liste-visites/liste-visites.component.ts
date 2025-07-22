import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { AjoutVisiteDialogComponent } from '../../components/ajout-visite-dialog/ajout-visite-dialog.component';

interface Visite {
  id: number;
  visiteurNom: string;
  visiteurEmail: string;
  nombrePersonnes: number;
  dateVisite: Date;
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
    MatDialogModule
  ],
  template: `
    <div class="container">
      <h1>Gestion des visites</h1>
      
      <button (click)="ouvrirDialogAjout()">Enregistrer une visite</button>
      
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Personnes</th>
            <th>Date</th>
            <th>Prix</th>
            <th>Commentaire</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let visite of visites">
            <td>{{visite.visiteurNom}}</td>
            <td>{{visite.visiteurEmail}}</td>
            <td>{{visite.nombrePersonnes}}</td>
            <td>{{visite.dateVisite | date:'short'}}</td>
            <td>{{visite.prix}}€</td>
            <td>{{visite.commentaire || '-'}}</td>
            <td>
              <button (click)="supprimerVisite(visite.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    button {
      margin-right: 5px;
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
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
    console.log('Chargement des visites...');
    this.api.get<Visite[]>('/visites').subscribe({
      next: (data) => {
        console.log('Visites chargées:', data);
        this.visites = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des visites:', err);
      }
    });
  }

  ouvrirDialogAjout(): void {
    const dialogRef = this.dialog.open(AjoutVisiteDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Données pour nouvelle visite:', result);
        this.api.post<Visite>('/visites', result).subscribe({
          next: (visite) => {
            console.log('Visite enregistrée avec succès:', visite);
            this.chargerVisites();
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout:', err);
          }
        });
      }
    });
  }

  supprimerVisite(id: number): void {
    console.log('Supprimer visite:', id);
    this.api.delete<any>(`/visites/${id}`).subscribe({
      next: () => {
        console.log('Visite supprimée');
        this.chargerVisites();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
      }
    });
  }
}
