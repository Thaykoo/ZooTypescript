import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-ajout-soigneur-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule,
    MatIconModule,
    MatCheckboxModule
  ],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <h2 mat-dialog-title>
          <mat-icon class="header-icon">medical_services</mat-icon>
          Ajouter un nouveau soigneur
        </h2>
        <p class="dialog-subtitle">Enregistrez un nouveau membre de l'équipe soignante</p>
      </div>

      <mat-dialog-content class="dialog-content">
        <div class="form-grid">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Nom du soigneur</mat-label>
            <input matInput [(ngModel)]="soigneur.name" placeholder="Ex: Dr. Martin Dupont" required>
            <mat-icon matSuffix>person</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Spécialité</mat-label>
            <mat-select [(ngModel)]="soigneur.specialite" required>
              <mat-option value="Vétérinaire généraliste">🩺 Vétérinaire généraliste</mat-option>
              <mat-option value="Vétérinaire pour félins">🦁 Vétérinaire pour félins</mat-option>
              <mat-option value="Vétérinaire pour primates">🐒 Vétérinaire pour primates</mat-option>
              <mat-option value="Vétérinaire pour oiseaux">🦅 Vétérinaire pour oiseaux</mat-option>
              <mat-option value="Vétérinaire aquatique">🐠 Vétérinaire aquatique</mat-option>
              <mat-option value="Soigneur animalier">👨‍⚕️ Soigneur animalier</mat-option>
              <mat-option value="Nutritionniste animal">🥕 Nutritionniste animal</mat-option>
              <mat-option value="Comportementaliste">🧠 Comportementaliste</mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Section Expérience -->
          <div class="experience-section">
            <div class="experience-header">
              <mat-icon class="experience-icon">work</mat-icon>
              <span class="experience-title">Années d'expérience</span>
            </div>
            
            <div class="experience-controls">
              <div class="experience-display">
                <span class="experience-value">{{soigneur.experience}} ans</span>
                <span class="experience-status" 
                      [class.junior]="soigneur.experience <= 2"
                      [class.senior]="soigneur.experience > 2 && soigneur.experience <= 8"
                      [class.expert]="soigneur.experience > 8">
                  {{getExperienceStatus()}}
                </span>
              </div>
              
              <!-- Sélection rapide par niveau -->
              <div class="quick-controls">
                <button mat-button (click)="setExperience(1)" class="quick-btn junior-btn" 
                        [class.active]="soigneur.experience <= 2">
                  <mat-icon>school</mat-icon>
                  Débutant (0-2 ans)
                </button>
                <button mat-button (click)="setExperience(5)" class="quick-btn senior-btn"
                        [class.active]="soigneur.experience > 2 && soigneur.experience <= 8">
                  <mat-icon>work</mat-icon>
                  Expérimenté (3-8 ans)
                </button>
                <button mat-button (click)="setExperience(12)" class="quick-btn expert-btn"
                        [class.active]="soigneur.experience > 8">
                  <mat-icon>star</mat-icon>
                  Expert (9+ ans)
                </button>
              </div>

              <!-- Sélection précise par années -->
              <div class="precise-selection">
                <mat-form-field appearance="outline" class="years-field">
                  <mat-label>Sélection précise</mat-label>
                  <mat-select [(ngModel)]="soigneur.experience">
                    <mat-option value="0">Stagiaire (0 an)</mat-option>
                    <mat-option value="1">1 an - Débutant</mat-option>
                    <mat-option value="2">2 ans - Débutant</mat-option>
                    <mat-option value="3">3 ans - Expérimenté</mat-option>
                    <mat-option value="4">4 ans - Expérimenté</mat-option>
                    <mat-option value="5">5 ans - Expérimenté</mat-option>
                    <mat-option value="6">6 ans - Expérimenté</mat-option>
                    <mat-option value="7">7 ans - Expérimenté</mat-option>
                    <mat-option value="8">8 ans - Expérimenté</mat-option>
                    <mat-option value="9">9 ans - Expert</mat-option>
                    <mat-option value="10">10 ans - Expert</mat-option>
                    <mat-option value="12">12 ans - Expert</mat-option>
                    <mat-option value="15">15 ans - Expert</mat-option>
                    <mat-option value="20">20+ ans - Expert senior</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
              
              <div class="slider-wrapper">
                <div class="slider-labels">
                  <span class="label-start">Débutant</span>
                  <span class="label-middle">Expérimenté</span>
                  <span class="label-end">Expert</span>
                </div>
                
                <div class="slider-container">
                  <mat-slider 
                    min="0" 
                    max="20" 
                    step="1" 
                    [(ngModel)]="soigneur.experience"
                    class="experience-slider"
                    [displayWith]="formatSliderLabel">
                    <input matSliderThumb>
                  </mat-slider>
                </div>
                
                <div class="slider-marks">
                  <div class="mark junior" [class.active]="soigneur.experience <= 2">Débutant</div>
                  <div class="mark senior" [class.active]="soigneur.experience > 2 && soigneur.experience <= 8">Expérimenté</div>
                  <div class="mark expert" [class.active]="soigneur.experience > 8">Expert</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Statut actif -->
          <div class="status-section">
            <mat-checkbox [(ngModel)]="soigneur.actif" class="status-checkbox">
              <span class="checkbox-label">
                <mat-icon>{{soigneur.actif ? 'check_circle' : 'cancel'}}</mat-icon>
                {{soigneur.actif ? 'Soigneur actif' : 'Soigneur inactif'}}
              </span>
            </mat-checkbox>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions class="dialog-actions">
        <button mat-button (click)="annuler()" class="cancel-btn">
          <mat-icon>close</mat-icon>
          Annuler
        </button>
        <button mat-raised-button (click)="confirmer()" 
                [disabled]="!soigneur.name || !soigneur.specialite" 
                class="confirm-btn">
          <mat-icon>add</mat-icon>
          Ajouter le soigneur
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
      max-width: 650px;
      width: 100%;
    }

    .dialog-header {
      background: linear-gradient(135deg, #4caf50, #66bb6a);
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

    .form-field {
      width: 100%;
      background: white !important;
      border-radius: 12px !important;
    }

    .experience-section {
      background: #f1f8e9;
      padding: 2rem;
      border-radius: 16px;
      border: 3px solid #c8e6c9;
      box-shadow: 0 4px 20px rgba(76, 175, 80, 0.1);
    }

    .experience-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .experience-icon {
      color: #4caf50 !important;
      font-size: 1.5rem !important;
    }

    .experience-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #333 !important;
    }

    .experience-controls {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .experience-display {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .experience-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: #333 !important;
    }

    .experience-status {
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 1rem;
    }

    .experience-status.junior {
      background: #ffecb3;
      color: #f57c00 !important;
    }

    .experience-status.senior {
      background: #e3f2fd;
      color: #1976d2 !important;
    }

    .experience-status.expert {
      background: #f3e5f5;
      color: #7b1fa2 !important;
    }

    /* Sélection précise par années */
    .precise-selection {
      margin: 1rem 0;
    }

    .years-field {
      width: 100%;
    }

    .years-field .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }

    .slider-wrapper {
      background: white;
      padding: 1.5rem;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .slider-labels {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .label-start { color: #f57c00; }
    .label-middle { color: #1976d2; }
    .label-end { color: #7b1fa2; }

    .slider-container {
      margin: 1rem 0;
      position: relative;
    }

    .experience-slider {
      width: 100% !important;
      height: 48px !important;
    }

    .quick-controls {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .quick-btn {
      flex: 1;
      border-radius: 12px !important;
      font-weight: 600 !important;
      transition: all 0.3s ease !important;
      border: 2px solid transparent !important;
    }

    .junior-btn {
      background: #ffecb3 !important;
      color: #f57c00 !important;
    }

    .senior-btn {
      background: #e3f2fd !important;
      color: #1976d2 !important;
    }

    .expert-btn {
      background: #f3e5f5 !important;
      color: #7b1fa2 !important;
    }

    .quick-btn.active {
      border-color: currentColor !important;
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
    }

    .status-section {
      background: #fafafa;
      padding: 1.5rem;
      border-radius: 12px;
      border: 2px solid #e0e0e0;
    }

    .status-checkbox {
      font-size: 1.1rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
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

    .confirm-btn {
      background: linear-gradient(45deg, #4caf50, #66bb6a) !important;
      color: white !important;
      border-radius: 12px !important;
      font-weight: 600 !important;
      padding: 0.5rem 2rem !important;
      transition: all 0.3s ease !important;
    }

    .confirm-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4) !important;
    }

    .confirm-btn:disabled {
      background: #e0e0e0 !important;
      color: #999 !important;
    }
  `]
})
export class AjoutSoigneurDialogComponent {
  soigneur = {
    name: '',
    specialite: '',
    experience: 3,
    actif: true
  };

  constructor(
    public dialogRef: MatDialogRef<AjoutSoigneurDialogComponent>
  ) {}

  getExperienceStatus(): string {
    if (this.soigneur.experience === 0) return 'Stagiaire';
    if (this.soigneur.experience > 8) return 'Expert';
    if (this.soigneur.experience > 2) return 'Expérimenté';
    return 'Débutant';
  }

  formatSliderLabel(value: number): string {
    return `${value} ans`;
  }

  setExperience(value: number): void {
    this.soigneur.experience = value;
  }

  confirmer(): void {
    if (this.soigneur.name && this.soigneur.specialite) {
      this.dialogRef.close(this.soigneur);
    }
  }

  annuler(): void {
    this.dialogRef.close();
  }
}
