import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
    MatDialogModule
  ],
  template: `
    <div class="container">
      <h1>Gestion des enclos</h1>
      
      <button (click)="ouvrirDialogAjout()">Ajouter un enclos</button>
      
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Capacité</th>
            <th>Propreté</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let enclos of enclos">
            <td>{{enclos.name}}</td>
            <td>{{enclos.type}}</td>
            <td>{{enclos.capacity}}</td>
            <td>{{enclos.cleanliness}}</td>
            <td>
              <button (click)="nettoyerEnclos(enclos.id)">Nettoyer</button>
              <button (click)="supprimerEnclos(enclos.id)">Supprimer</button>
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
    }
  `]
})
export class ListeEnclosComponent implements OnInit {
  enclos: Enclos[] = [];

  constructor(
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.chargerEnclos();
  }

  chargerEnclos(): void {
    console.log('Chargement des enclos...');
    this.api.get<Enclos[]>('/enclos').subscribe({
      next: (data) => {
        console.log('Enclos chargés:', data);
        this.enclos = data; // Utilise les vraies données de l'API
      },
      error: (err) => {
        console.error('Erreur lors du chargement des enclos:', err);
        // SUPPRIMEZ ces lignes de données factices
        // this.enclos = [
        //   { id: 1, name: 'Savane', type: 'Extérieur', capacity: 10, cleanliness: 80 },
        //   { id: 2, name: 'Forêt', type: 'Intérieur', capacity: 5, cleanliness: 95 }
        // ];
      }
    });
  }

  ouvrirDialogAjout(): void {
    const dialogRef = this.dialog.open(AjoutEnclosDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Données pour nouvel enclos:', result);
        this.api.post<Enclos>('/enclos', result).subscribe({
          next: (enclos) => {
            console.log('Enclos ajouté avec succès:', enclos);
            this.chargerEnclos(); // Recharger la liste
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout:', err);
            // Supprimez cette simulation pour utiliser seulement les vraies données
          }
        });
      }
    });
  }

  nettoyerEnclos(id: number): void {
    console.log('Nettoyer enclos:', id);
    this.api.patch<Enclos>(`/enclos/${id}/nettoyer`).subscribe({
      next: (enclos) => {
        console.log('Enclos nettoyé:', enclos);
        this.chargerEnclos();
      },
      error: (err) => {
        console.error('Erreur lors du nettoyage:', err);
      }
    });
  }

  supprimerEnclos(id: number): void {
    console.log('Supprimer enclos:', id);
    this.api.delete<any>(`/enclos/${id}`).subscribe({
      next: () => {
        console.log('Enclos supprimé');
        this.chargerEnclos();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
      }
    });
  }
}