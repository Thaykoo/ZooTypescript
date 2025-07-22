import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
    MatDialogModule
  ],
  template: `
    <div class="container">
      <h1>Liste des animaux</h1>
      
      <button (click)="ouvrirDialogAjout()">Ajouter un animal</button>
      
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Espèce</th>
            <th>Santé</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let animal of animaux">
            <td>{{animal.name}}</td>
            <td>{{animal.species}}</td>
            <td>{{animal.health}}</td>
            <td>
              <button (click)="soignerAnimal(animal.id)">Soigner</button>
              <button (click)="supprimerAnimal(animal.id)">Supprimer</button>
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
    console.log('Chargement des animaux...');
    this.api.get<Animal[]>('/animaux').subscribe({
      next: (data) => {
        console.log('Animaux chargés:', data);
        this.animaux = data; // Utilise les vraies données de l'API
      },
      error: (err) => {
        console.error('Erreur lors du chargement des animaux:', err);
        // SUPPRIMEZ ces lignes de données factices
        // this.animaux = [
        //   { id: 1, name: 'Leo', species: 'Lion', health: 80 },
        //   { id: 2, name: 'Dumbo', species: 'Éléphant', health: 95 }
        // ];
      }
    });
  }

  ouvrirDialogAjout(): void {
    const dialogRef = this.dialog.open(AjoutAnimalDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Données pour nouvel animal:', result);
        this.api.post<Animal>('/animaux', result).subscribe({
          next: (animal) => {
            console.log('Animal ajouté avec succès:', animal);
            this.chargerAnimaux(); // Recharger la liste
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout:', err);
            // Simuler un ajout réussi pour le développement
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
    
    // ✅ CORRECTION : GET au lieu de PATCH
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
    console.log('Supprimer animal:', id);
    this.api.delete<any>(`/animaux/${id}`).subscribe({
      next: () => {
        console.log('Animal supprimé');
        this.chargerAnimaux();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
        // Simuler une suppression réussie
        this.animaux = this.animaux.filter(a => a.id !== id);
      }
    });
  }
}
