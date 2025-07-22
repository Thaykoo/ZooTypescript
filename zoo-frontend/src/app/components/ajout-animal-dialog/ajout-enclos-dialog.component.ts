import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

interface CreateEnclosDto {
  name: string;
  type: string;
  capacity: number;
}

@Component({
  selector: 'app-ajout-enclos-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title>Ajouter un enclos</h2>
    <mat-dialog-content>
      <div class="form-container">
        <mat-form-field>
          <mat-label>Nom</mat-label>
          <input matInput [(ngModel)]="enclos.name" required>
        </mat-form-field>
        
        <mat-form-field>
          <mat-label>Type</mat-label>
          <mat-select [(ngModel)]="enclos.type" required>
            <mat-option value="Intérieur">Intérieur</mat-option>
            <mat-option value="Extérieur">Extérieur</mat-option>
            <mat-option value="Aquatique">Aquatique</mat-option>
            <mat-option value="Volière">Volière</mat-option>
          </mat-select>
        </mat-form-field>
        
        <mat-form-field>
          <mat-label>Capacité</mat-label>
          <input matInput type="number" [(ngModel)]="enclos.capacity" min="1" required>
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Annuler</button>
      <button mat-raised-button color="primary" (click)="ajouter()" [disabled]="!isValid()">
        Ajouter
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `]
})
export class AjoutEnclosDialogComponent {
  enclos: CreateEnclosDto = {
    name: '',
    type: '',
    capacity: 5
  };

  constructor(private dialogRef: MatDialogRef<AjoutEnclosDialogComponent>) {}

  isValid(): boolean {
    return !!this.enclos.name && !!this.enclos.type && this.enclos.capacity > 0;
  }

  ajouter(): void {
    if (this.isValid()) {
      this.dialogRef.close(this.enclos);
    }
  }
}