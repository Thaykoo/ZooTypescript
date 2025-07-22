import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ajout-visite-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  template: `
    <div style="padding: 20px; min-width: 350px;">
      <h2>Enregistrer une visite</h2>
      
      <div style="margin-bottom: 15px;">
        <label>Nom du visiteur:</label>
        <input 
          type="text" 
          [(ngModel)]="visite.visiteurNom" 
          placeholder="Ex: Jean Dupont"
          style="width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label>Email:</label>
        <input 
          type="email" 
          [(ngModel)]="visite.visiteurEmail" 
          placeholder="Ex: jean@email.com"
          style="width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label>Nombre de personnes:</label>
        <input 
          type="number" 
          [(ngModel)]="visite.nombrePersonnes" 
          min="1"
          style="width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label>Prix (€):</label>
        <input 
          type="number" 
          [(ngModel)]="visite.prix" 
          min="0"
          step="0.01"
          style="width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box;">
      </div>
      
      <div style="margin-bottom: 20px;">
        <label>Commentaire (optionnel):</label>
        <textarea 
          [(ngModel)]="visite.commentaire" 
          placeholder="Ex: Visite en famille"
          style="width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box; height: 80px;">
        </textarea>
      </div>
      
      <div style="text-align: right;">
        <button 
          (click)="annuler()" 
          style="margin-right: 10px; padding: 8px 16px; border: 1px solid #ccc; background: white;">
          Annuler
        </button>
        <button 
          (click)="ajouter()" 
          [disabled]="!isFormValid()"
          style="padding: 8px 16px; background-color: #007bff; color: white; border: none; cursor: pointer;"
          [style.opacity]="isFormValid() ? '1' : '0.5'">
          Enregistrer
        </button>
      </div>
    </div>
  `
})
export class AjoutVisiteDialogComponent {
  visite = {
    visiteurNom: '',
    visiteurEmail: '',
    nombrePersonnes: 1,
    prix: 25.00,
    commentaire: ''
  };

  constructor(public dialogRef: MatDialogRef<AjoutVisiteDialogComponent>) {}

  isFormValid(): boolean {
    return this.visite.visiteurNom.trim() !== '' && 
           this.visite.visiteurEmail.trim() !== '' &&
           this.visite.visiteurEmail.includes('@') &&
           this.visite.nombrePersonnes >= 1 && 
           this.visite.prix >= 0;
  }

  annuler(): void {
    this.dialogRef.close(null);
  }

  ajouter(): void {
    if (this.isFormValid()) {
      this.dialogRef.close(this.visite);
    }
  }
}