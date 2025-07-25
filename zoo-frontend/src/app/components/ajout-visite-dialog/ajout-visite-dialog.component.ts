import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ajout-visite-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <h2 mat-dialog-title>
          <mat-icon class="header-icon">confirmation_number</mat-icon>
          Nouvelle visite
        </h2>
        <p class="dialog-subtitle">Planifiez une visite mémorable au zoo</p>
      </div>

      <mat-dialog-content class="dialog-content">
        <div class="form-grid">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Nom du visiteur</mat-label>
            <input matInput [(ngModel)]="visite.visiteurNom" placeholder="Ex: Jean Dupont" required>
            <mat-icon matSuffix>person</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Email</mat-label>
            <input matInput type="email" [(ngModel)]="visite.visiteurEmail" placeholder="Ex: jean.dupont@email.com" required>
            <mat-icon matSuffix>email</mat-icon>
          </mat-form-field>

          <div class="form-row">
            <mat-form-field appearance="outline" class="form-field-half">
              <mat-label>Nombre de personnes</mat-label>
              <mat-select [(ngModel)]="visite.nombrePersonnes" required>
                <mat-option value="1">👤 1 personne</mat-option>
                <mat-option value="2">👥 2 personnes</mat-option>
                <mat-option value="3">👥 3 personnes</mat-option>
                <mat-option value="4">👪 4 personnes</mat-option>
                <mat-option value="5">👪 5 personnes</mat-option>
                <mat-option value="6">👨‍👩‍👧‍👦 6+ personnes</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field-half">
              <mat-label>Prix par personne</mat-label>
              <input matInput type="number" [(ngModel)]="visite.prix" min="5" max="100" step="5" required>
              <span matSuffix>€</span>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Date de visite</mat-label>
            <input matInput [matDatepicker]="picker" [(ngModel)]="visite.dateVisite" required>
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Commentaire (optionnel)</mat-label>
            <textarea matInput [(ngModel)]="visite.commentaire" 
                      placeholder="Occasion spéciale, demandes particulières..." 
                      rows="3"></textarea>
            <mat-icon matSuffix>comment</mat-icon>
          </mat-form-field>

          <div class="price-summary">
            <div class="summary-item">
              <span class="summary-label">Nombre de personnes:</span>
              <span class="summary-value">{{visite.nombrePersonnes}}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Prix par personne:</span>
              <span class="summary-value">{{visite.prix}}€</span>
            </div>
            <div class="summary-total">
              <span class="total-label">Total:</span>
              <span class="total-value">{{(visite.nombrePersonnes * visite.prix) || 0}}€</span>
            </div>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions class="dialog-actions">
        <button mat-button (click)="annuler()" class="cancel-btn">
          <mat-icon>close</mat-icon>
          Annuler
        </button>
        <button mat-raised-button (click)="confirmer()" 
                [disabled]="!visite.visiteurNom || !visite.visiteurEmail || !visite.nombrePersonnes || !visite.prix || !visite.dateVisite" 
                class="confirm-btn">
          <mat-icon>add</mat-icon>
          Réserver la visite
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 0;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      max-width: 700px;
      width: 100%;
    }

    .dialog-header {
      background: linear-gradient(135deg, #87ceeb, #4fc3f7);
      color: white;
      padding: 2rem;
      text-align: center;
    }

    .dialog-header h2 {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      font-size: 1.5rem;
      font-weight: 600;
      color: white !important;
    }

    .header-icon {
      font-size: 2rem !important;
      width: 2rem !important;
      height: 2rem !important;
      color: white !important;
    }

    .dialog-subtitle {
      margin: 0.5rem 0 0 0;
      opacity: 0.9;
      font-size: 0.95rem;
      color: white !important;
    }

    .dialog-content {
      padding: 2rem;
      background: white;
    }

    .form-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: flex;
      gap: 1rem;
    }

    .form-field {
      width: 100%;
    }

    .form-field-half {
      flex: 1;
    }

    .form-field ::ng-deep .mdc-floating-label {
      color: #1976d2 !important;
      font-weight: 600 !important;
    }

    .form-field ::ng-deep .mdc-floating-label--float-above {
      color: #1976d2 !important;
    }

    .form-field ::ng-deep .mat-mdc-form-field-outline-thick {
      color: #4fc3f7 !important;
    }

    .form-field ::ng-deep .mat-mdc-input-element {
      color: #333 !important;
      font-weight: 500 !important;
    }

    .form-field ::ng-deep .mat-mdc-select-value {
      color: #333 !important;
      font-weight: 500 !important;
    }

    .form-field-half ::ng-deep .mdc-floating-label {
      color: #1976d2 !important;
      font-weight: 600 !important;
    }

    .form-field-half ::ng-deep .mdc-floating-label--float-above {
      color: #1976d2 !important;
    }

    .form-field-half ::ng-deep .mat-mdc-form-field-outline-thick {
      color: #4fc3f7 !important;
    }

    .form-field-half ::ng-deep .mat-mdc-input-element {
      color: #333 !important;
      font-weight: 500 !important;
    }

    .form-field-half ::ng-deep .mat-mdc-select-value {
      color: #333 !important;
      font-weight: 500 !important;
    }

    .price-summary {
      background: #f0f9ff;
      padding: 1.5rem;
      border-radius: 12px;
      border: 2px solid #e3f2fd;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      color: #666;
    }

    .summary-label {
      font-weight: 500;
    }

    .summary-value {
      font-weight: 600;
      color: #333;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 2px solid #4fc3f7;
    }

    .total-label {
      font-weight: 700;
      font-size: 1.1rem;
      color: #1976d2;
    }

    .total-value {
      font-weight: 700;
      font-size: 1.2rem;
      color: #4fc3f7;
    }

    .dialog-actions {
      padding: 1.5rem 2rem 2rem;
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      background: white;
    }

    .cancel-btn {
      color: #666 !important;
      border: 2px solid #e0e0e0 !important;
      border-radius: 12px !important;
      font-weight: 500 !important;
      padding: 0.5rem 1.5rem !important;
    }

    .cancel-btn:hover {
      background: #f5f5f5 !important;
      border-color: #ccc !important;
    }

    .confirm-btn {
      background: linear-gradient(45deg, #87ceeb, #4fc3f7) !important;
      color: white !important;
      border-radius: 12px !important;
      font-weight: 600 !important;
      padding: 0.5rem 2rem !important;
      transition: all 0.3s ease !important;
    }

    .confirm-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4) !important;
    }

    .confirm-btn:disabled {
      background: #e0e0e0 !important;
      color: #999 !important;
    }

    @media (max-width: 600px) {
      .form-row {
        flex-direction: column;
      }
    }
  `]
})
export class AjoutVisiteDialogComponent {
  visite = {
    visiteurNom: '',
    visiteurEmail: '',
    nombrePersonnes: 1,
    dateVisite: new Date(),
    prix: 15,
    commentaire: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AjoutVisiteDialogComponent>
  ) {}

  confirmer(): void {
    if (this.visite.visiteurNom && this.visite.visiteurEmail && 
        this.visite.nombrePersonnes && this.visite.prix && this.visite.dateVisite) {
      this.dialogRef.close(this.visite);
    }
  }

  annuler(): void {
    this.dialogRef.close();
  }
}