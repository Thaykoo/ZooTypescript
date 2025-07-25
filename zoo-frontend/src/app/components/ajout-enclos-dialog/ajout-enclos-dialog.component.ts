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

@Component({
  selector: 'app-ajout-enclos-dialog',
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
    MatIconModule
  ],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <h2 mat-dialog-title>
          <mat-icon class="header-icon">home</mat-icon>
          Créer un nouvel enclos
        </h2>
        <p class="dialog-subtitle">Aménagez un habitat confortable</p>
      </div>

      <mat-dialog-content class="dialog-content">
        <div class="form-grid">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Nom de l'enclos</mat-label>
            <input matInput [(ngModel)]="enclos.name" placeholder="Ex: Savane des Lions" required>
            <mat-icon matSuffix>badge</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Type d'habitat</mat-label>
            <mat-select [(ngModel)]="enclos.type" required>
              <mat-option value="Savane">🌾 Savane</mat-option>
              <mat-option value="Forêt">🌲 Forêt</mat-option>
              <mat-option value="Jungle">🌿 Jungle</mat-option>
              <mat-option value="Désert">🏜️ Désert</mat-option>
              <mat-option value="Montagne">🏔️ Montagne</mat-option>
              <mat-option value="Aquarium">🐠 Aquarium</mat-option>
              <mat-option value="Volière">🦅 Volière</mat-option>
              <mat-option value="Arctique">🧊 Arctique</mat-option>
              <mat-option value="Tropical">🌺 Tropical</mat-option>
              <mat-option value="Prairie">🌱 Prairie</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Capacité</mat-label>
            <input matInput type="number" [(ngModel)]="enclos.capacity" min="1" max="50" required>
            <span matSuffix>animaux</span>
          </mat-form-field>

          <div class="cleanliness-section">
            <div class="cleanliness-header">
              <mat-icon class="cleanliness-icon">cleaning_services</mat-icon>
              <span class="cleanliness-title">Propreté de l'enclos</span>
            </div>
            
            <div class="cleanliness-controls">
              <div class="cleanliness-display">
                <span class="cleanliness-value">{{enclos.cleanliness}}%</span>
                <span class="cleanliness-status" 
                      [class.critical]="enclos.cleanliness <= 30"
                      [class.warning]="enclos.cleanliness > 30 && enclos.cleanliness <= 70"
                      [class.good]="enclos.cleanliness > 70">
                  {{getCleanlinessStatus()}}
                </span>
              </div>
              
              <div class="slider-wrapper">
                <div class="slider-labels">
                  <span class="label-start">Sale</span>
                  <span class="label-middle">Correct</span>
                  <span class="label-end">Impeccable</span>
                </div>
                
                <div class="slider-container">
                  <mat-slider 
                    min="0" 
                    max="100" 
                    step="1" 
                    [(ngModel)]="enclos.cleanliness"
                    (input)="onCleanlinessChange($event)"
                    class="cleanliness-slider"
                    [displayWith]="formatSliderLabel">
                    <input matSliderThumb>
                  </mat-slider>
                </div>
                
                <div class="slider-marks">
                  <div class="mark critical" [class.active]="enclos.cleanliness <= 30">0-30%</div>
                  <div class="mark warning" [class.active]="enclos.cleanliness > 30 && enclos.cleanliness <= 70">30-70%</div>
                  <div class="mark good" [class.active]="enclos.cleanliness > 70">70-100%</div>
                </div>
              </div>
              
              <div class="quick-controls">
                <button mat-button (click)="setCleanliness(15)" class="quick-btn critical-btn" 
                        [class.active]="enclos.cleanliness <= 30">
                  <mat-icon>warning</mat-icon>
                  Sale
                </button>
                <button mat-button (click)="setCleanliness(50)" class="quick-btn warning-btn"
                        [class.active]="enclos.cleanliness > 30 && enclos.cleanliness <= 70">
                  <mat-icon>check_circle_outline</mat-icon>
                  Correct
                </button>
                <button mat-button (click)="setCleanliness(100)" class="quick-btn good-btn"
                        [class.active]="enclos.cleanliness > 70">
                  <mat-icon>auto_awesome</mat-icon>
                  Impeccable
                </button>
              </div>
              
              <div class="cleanliness-bar-visual">
                <div class="cleanliness-bar">
                  <div class="cleanliness-fill" 
                       [style.width.%]="enclos.cleanliness"
                       [class.critical]="enclos.cleanliness <= 30"
                       [class.warning]="enclos.cleanliness > 30 && enclos.cleanliness <= 70"
                       [class.good]="enclos.cleanliness > 70"></div>
                  <div class="cleanliness-markers">
                    <div class="marker" style="left: 30%"></div>
                    <div class="marker" style="left: 70%"></div>
                  </div>
                </div>
              </div>
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
                [disabled]="!enclos.name || !enclos.type || !enclos.capacity" 
                class="confirm-btn">
          <mat-icon>add</mat-icon>
          Créer l'enclos
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
    background: linear-gradient(135deg, #8b4513, #cd853f);
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
    background: white !important; /* FOND BLANC FORCÉ */
    border-radius: 12px !important;
    position: relative !important;
    z-index: 100 !important; /* Z-index élevé pour être au-dessus */
  }

  /* Texte noir visible */
  .form-field ::ng-deep .mdc-floating-label {
    color: #333 !important;
    font-weight: 600 !important;
  }

  .form-field ::ng-deep .mdc-floating-label--float-above {
    color: #8b4513 !important;
  }

  .form-field ::ng-deep .mat-mdc-form-field-outline-thick {
    color: #cd853f !important;
  }

  .form-field ::ng-deep .mat-mdc-input-element {
    color: #333 !important;
    font-weight: 500 !important;
    background: white !important;
  }

  .form-field ::ng-deep .mat-mdc-select-value {
    color: #333 !important;
    font-weight: 500 !important;
    background: white !important;
  }

  /* FOND BLANC POUR LE SELECT - CORRECTION PRINCIPALE */
  .form-field ::ng-deep .mat-mdc-select-trigger {
    background: white !important;
    border-radius: 8px !important;
  }

  .form-field ::ng-deep .mat-mdc-select-value-text {
    background: white !important;
    color: #333 !important;
  }

  .form-field ::ng-deep .mat-mdc-form-field-wrapper {
    background: white !important;
    border-radius: 8px !important;
  }

  .form-field ::ng-deep .mat-mdc-text-field-wrapper {
    background: white !important;
    border-radius: 8px !important;
  }

  /* Section propreté avec z-index plus faible */
  .cleanliness-section {
    background: #faf9f7;
    padding: 2rem;
    border-radius: 16px;
    border: 3px solid #f4e4bc;
    box-shadow: 0 4px 20px rgba(139, 69, 19, 0.1);
    position: relative;
    z-index: 1; /* Z-index plus faible */
  }

  .cleanliness-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .cleanliness-icon {
    color: #cd853f !important;
    font-size: 1.5rem !important;
  }

  .cleanliness-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #333 !important;
  }

  .cleanliness-controls {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .cleanliness-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .cleanliness-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: #333 !important;
  }

  .cleanliness-status {
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 1rem;
  }

  .cleanliness-status.critical {
    background: #fff3e0;
    color: #8b4513 !important;
  }

  .cleanliness-status.warning {
    background: #f4e4bc;
    color: #cd853f !important;
  }

  .cleanliness-status.good {
    background: #f0f8e8;
    color: #2e7d32 !important;
  }

  /* SLIDER WRAPPER */
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

  .label-start { color: #8b4513; }
  .label-middle { color: #cd853f; }
  .label-end { color: #2e7d32; }

  /* SLIDER */
  .slider-container {
    margin: 1rem 0;
    position: relative;
  }

  .cleanliness-slider {
    width: 100% !important;
    height: 48px !important;
  }

  .cleanliness-slider ::ng-deep .mdc-slider {
    height: 48px !important;
  }

  .cleanliness-slider ::ng-deep .mdc-slider__track {
    height: 8px !important;
    background: linear-gradient(90deg, #ddd2c4 0%, #f4e4bc 50%, #f0f8e8 100%) !important;
  }

  .cleanliness-slider ::ng-deep .mdc-slider__track--active_fill {
    height: 8px !important;
    background: #cd853f !important;
  }

  .cleanliness-slider ::ng-deep .mdc-slider__thumb {
    width: 32px !important;
    height: 32px !important;
    border: 4px solid #cd853f !important;
    background: white !important;
    box-shadow: 0 4px 12px rgba(205, 133, 63, 0.3) !important;
  }

  .cleanliness-slider ::ng-deep .mdc-slider__thumb:hover {
    transform: scale(1.1) !important;
  }

  .slider-marks {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }

  .mark {
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    font-weight: 600;
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  .mark.active {
    opacity: 1;
    transform: scale(1.05);
  }

  .mark.critical { background: #fff3e0; color: #8b4513; }
  .mark.warning { background: #f4e4bc; color: #cd853f; }
  .mark.good { background: #f0f8e8; color: #2e7d32; }

  /* BOUTONS DE CONTRÔLE RAPIDE */
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

  .critical-btn {
    background: #fff3e0 !important;
    color: #8b4513 !important;
  }

  .warning-btn {
    background: #f4e4bc !important;
    color: #cd853f !important;
  }

  .good-btn {
    background: #f0f8e8 !important;
    color: #2e7d32 !important;
  }

  .quick-btn.active {
    border-color: currentColor !important;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
  }

  /* BARRE VISUELLE */
  .cleanliness-bar-visual {
    margin-top: 1rem;
  }

  .cleanliness-bar {
    width: 100%;
    height: 20px;
    background: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }

  .cleanliness-fill {
    height: 100%;
    transition: all 0.3s ease;
    border-radius: 10px;
    position: relative;
  }

  .cleanliness-fill.critical {
    background: linear-gradient(45deg, #8b4513, #a0522d);
  }

  .cleanliness-fill.warning {
    background: linear-gradient(45deg, #cd853f, #daa520);
  }

  .cleanliness-fill.good {
    background: linear-gradient(45deg, #32cd32, #90ee90);
  }

  .cleanliness-markers {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  .marker {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(255,255,255,0.8);
    box-shadow: 0 0 4px rgba(0,0,0,0.3);
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
    background: linear-gradient(45deg, #8b4513, #cd853f) !important;
    color: white !important;
    border-radius: 12px !important;
    font-weight: 600 !important;
    padding: 0.5rem 2rem !important;
    transition: all 0.3s ease !important;
  }

  .confirm-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4) !important;
  }

  .confirm-btn:disabled {
    background: #e0e0e0 !important;
    color: #999 !important;
  }

  /* Options du select avec fond blanc FORCÉ */
  ::ng-deep .mat-mdc-option {
    color: #333 !important;
    font-weight: 500 !important;
    background: white !important;
  }

  ::ng-deep .mat-mdc-option.mdc-list-item--selected {
    background-color: #f4e4bc !important;
  }

  ::ng-deep .mat-mdc-option:hover {
    background-color: #faf9f7 !important;
  }

  /* Panel du select avec fond blanc */
  ::ng-deep .mat-mdc-select-panel {
    background: white !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15) !important;
    border: 2px solid #f4e4bc !important;
  }
`]
})
export class AjoutEnclosDialogComponent {
  enclos = {
    name: '',
    type: '',
    capacity: 5,
    cleanliness: 50
  };

  constructor(
    public dialogRef: MatDialogRef<AjoutEnclosDialogComponent>
  ) {}

  getCleanlinessStatus(): string {
    if (this.enclos.cleanliness > 70) return 'Impeccable';
    if (this.enclos.cleanliness > 30) return 'Correct';
    return 'Nécessite nettoyage';
  }

  formatSliderLabel(value: number): string {
    return `${value}%`;
  }

  setCleanliness(value: number): void {
    this.enclos.cleanliness = value;
  }

  onCleanlinessChange(event: any): void {
    this.enclos.cleanliness = event.target.value;
  }

  confirmer(): void {
    if (this.enclos.name && this.enclos.type && this.enclos.capacity) {
      this.dialogRef.close(this.enclos);
    }
  }

  annuler(): void {
    this.dialogRef.close();
  }
}