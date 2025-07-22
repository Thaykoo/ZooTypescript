import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ajout-enclos-dialog',
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
    <h2>Ajouter un enclos</h2>
    <div style="padding: 20px;">
      <div style="margin-bottom: 15px;">
        <label for="name">Nom de l'enclos:</label>
        <input 
          id="name"
          type="text" 
          [(ngModel)]="enclos.name" 
          placeholder="Ex: Savane"
          style="width: 100%; padding: 8px; margin-top: 5px;"
          required>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label for="type">Type d'enclos:</label>
        <input 
          id="type"
          type="text" 
          [(ngModel)]="enclos.type" 
          placeholder="Ex: Extérieur"
          style="width: 100%; padding: 8px; margin-top: 5px;"
          required>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label for="capacity">Capacité:</label>
        <input 
          id="capacity"
          type="number" 
          [(ngModel)]="enclos.capacity" 
          min="1"
          placeholder="Ex: 10"
          style="width: 100%; padding: 8px; margin-top: 5px;"
          required>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label for="cleanliness">Propreté (0-100):</label>
        <input 
          id="cleanliness"
          type="number" 
          [(ngModel)]="enclos.cleanliness" 
          min="0" 
          max="100"
          placeholder="Ex: 100"
          style="width: 100%; padding: 8px; margin-top: 5px;"
          required>
      </div>
    </div>
    
    <div style="padding: 10px; text-align: right;">
      <button 
        (click)="annuler()" 
        style="margin-right: 10px; padding: 8px 16px;">
        Annuler
      </button>
      <button 
        (click)="ajouter()" 
        [disabled]="!isFormValid()"
        style="padding: 8px 16px; background-color: #007bff; color: white; border: none;">
        Ajouter
      </button>
    </div>
  `
})
export class AjoutEnclosDialogComponent {
  enclos = {
    name: '',
    type: '',
    capacity: 1,
    cleanliness: 100
  };

  constructor(public dialogRef: MatDialogRef<AjoutEnclosDialogComponent>) {}

  isFormValid(): boolean {
    return this.enclos.name.trim() !== '' && 
           this.enclos.type.trim() !== '' &&
           this.enclos.capacity >= 1 && 
           this.enclos.cleanliness >= 0 && 
           this.enclos.cleanliness <= 100;
  }

  annuler(): void {
    console.log('Ajout d\'enclos annulé');
    this.dialogRef.close();
  }

  ajouter(): void {
    if (this.isFormValid()) {
      console.log('Données à envoyer:', this.enclos);
      this.dialogRef.close(this.enclos);
    } else {
      console.log('Formulaire invalide');
    }
  }
}