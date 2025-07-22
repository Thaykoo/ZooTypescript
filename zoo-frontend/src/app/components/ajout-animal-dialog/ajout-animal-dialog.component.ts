import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-ajout-animal-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  template: `
    <h2>Ajouter un animal</h2>
    <div>
      <div>
        <label>Nom:</label>
        <input [(ngModel)]="animal.name" required>
      </div>
      <div>
        <label>Espèce:</label>
        <input [(ngModel)]="animal.species" required>
      </div>
      <div>
        <label>Santé:</label>
        <input type="number" [(ngModel)]="animal.health" min="0" max="100" required>
      </div>
    </div>
    <div>
      <button (click)="annuler()">Annuler</button>
      <button (click)="ajouter()" [disabled]="!isFormValid()">Ajouter</button>
    </div>
  `
})
export class AjoutAnimalDialogComponent {
  animal = {
    name: '',
    species: '',
    health: 100
  };

  constructor(public dialogRef: MatDialogRef<AjoutAnimalDialogComponent>) {}

  isFormValid(): boolean {
    return this.animal.name.trim() !== '' && 
           this.animal.species.trim() !== '' && 
           this.animal.health >= 0 && 
           this.animal.health <= 100;
  }

  annuler(): void {
    this.dialogRef.close();
  }

  ajouter(): void {
    if (this.isFormValid()) {
      this.dialogRef.close(this.animal);
    }
  }
}
