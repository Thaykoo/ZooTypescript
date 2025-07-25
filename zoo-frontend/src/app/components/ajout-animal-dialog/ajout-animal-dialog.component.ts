import { Component, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-ajout-animal-dialog',
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
        <mat-icon class="header-icon">pets</mat-icon>
        Ajouter un nouvel animal
      </h2>
      <p class="dialog-subtitle">Remplissez les informations de votre compagnon</p>
    </div>

    <mat-dialog-content class="dialog-content">
      <div class="form-grid">
        <mat-form-field appearance="outline" class="form-field">
          <mat-label>Nom de l'animal</mat-label>
          <input matInput [(ngModel)]="animal.name" placeholder="Ex: Simba" required>
          <mat-icon matSuffix>badge</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline" class="form-field">
          <mat-label>Espèce</mat-label>
          <mat-select [(ngModel)]="animal.species" required>
            <mat-option value="Lion">🦁 Lion</mat-option>
            <mat-option value="Éléphant">🐘 Éléphant</mat-option>
            <mat-option value="Girafe">🦒 Girafe</mat-option>
            <mat-option value="Pingouin">🐧 Pingouin</mat-option>
            <mat-option value="Tigre">🐅 Tigre</mat-option>
            <mat-option value="Ours">🐻 Ours</mat-option>
            <mat-option value="Singe">🐒 Singe</mat-option>
            <mat-option value="Zèbre">🦓 Zèbre</mat-option>
            <mat-option value="Panda">🐼 Panda</mat-option>
            <mat-option value="Loup">🐺 Loup</mat-option>
          </mat-select>
        </mat-form-field>

        <!-- SECTION SANTÉ -->
        <div class="health-section">
          <div class="health-header">
            <mat-icon class="health-icon">favorite</mat-icon>
            <span class="health-title">Santé de l'animal</span>
          </div>
          
          <div class="health-controls">
            <div class="health-display">
              <span class="health-value">{{animal.health}}%</span>
              <span class="health-status" 
                    [class.critical]="animal.health <= 30"
                    [class.warning]="animal.health > 30 && animal.health <= 70"
                    [class.good]="animal.health > 70">
                {{getHealthStatus()}}
              </span>
            </div>
            
            <div class="slider-wrapper">
              <div class="slider-labels">
                <span class="label-start">Malade</span>
                <span class="label-middle">Moyen</span>
                <span class="label-end">Parfait</span>
              </div>
              
              <div class="slider-container">
                <mat-slider 
                  min="0" 
                  max="100" 
                  step="1" 
                  [(ngModel)]="animal.health"
                  (input)="onHealthChange($event)"
                  class="health-slider"
                  [displayWith]="formatSliderLabel">
                  <input matSliderThumb>
                </mat-slider>
              </div>
              
              <div class="slider-marks">
                <div class="mark critical" [class.active]="animal.health <= 30">0-30%</div>
                <div class="mark warning" [class.active]="animal.health > 30 && animal.health <= 70">30-70%</div>
                <div class="mark good" [class.active]="animal.health > 70">70-100%</div>
              </div>
            </div>
            
            <div class="quick-controls">
              <button mat-button (click)="setHealth(15)" class="quick-btn critical-btn" 
                      [class.active]="animal.health <= 30">
                <mat-icon>dangerous</mat-icon>
                Critique
              </button>
              <button mat-button (click)="setHealth(50)" class="quick-btn warning-btn"
                      [class.active]="animal.health > 30 && animal.health <= 70">
                <mat-icon>warning</mat-icon>
                Moyen
              </button>
              <button mat-button (click)="setHealth(100)" class="quick-btn good-btn"
                      [class.active]="animal.health > 70">
                <mat-icon>favorite</mat-icon>
                Parfait
              </button>
            </div>
            
            <div class="health-bar-visual">
              <div class="health-bar">
                <div class="health-fill" 
                     [style.width.%]="animal.health"
                     [class.critical]="animal.health <= 30"
                     [class.warning]="animal.health > 30 && animal.health <= 70"
                     [class.good]="animal.health > 70"></div>
                <div class="health-markers">
                  <div class="marker" style="left: 30%"></div>
                  <div class="marker" style="left: 70%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION BONHEUR -->
        <div class="happiness-section">
          <div class="happiness-header">
            <mat-icon class="happiness-icon">sentiment_very_satisfied</mat-icon>
            <span class="happiness-title">Bonheur de l'animal</span>
          </div>
          
          <div class="happiness-controls">
            <div class="happiness-display">
              <span class="happiness-value">{{animal.happiness}}%</span>
              <span class="happiness-status" 
                    [class.critical]="animal.happiness <= 30"
                    [class.warning]="animal.happiness > 30 && animal.happiness <= 70"
                    [class.good]="animal.happiness > 70">
                {{getHappinessStatus()}}
              </span>
            </div>
            
            <div class="slider-wrapper">
              <div class="slider-labels">
                <span class="label-start">Triste</span>
                <span class="label-middle">Content</span>
                <span class="label-end">Joyeux</span>
              </div>
              
              <div class="slider-container">
                <mat-slider 
                  min="0" 
                  max="100" 
                  step="1" 
                  [(ngModel)]="animal.happiness"
                  (input)="onHappinessChange($event)"
                  class="happiness-slider"
                  [displayWith]="formatSliderLabel">
                  <input matSliderThumb>
                </mat-slider>
              </div>
              
              <div class="slider-marks">
                <div class="mark critical" [class.active]="animal.happiness <= 30">0-30%</div>
                <div class="mark warning" [class.active]="animal.happiness > 30 && animal.happiness <= 70">30-70%</div>
                <div class="mark good" [class.active]="animal.happiness > 70">70-100%</div>
              </div>
            </div>
            
            <div class="quick-controls">
              <button mat-button (click)="setHappiness(15)" class="quick-btn critical-btn" 
                      [class.active]="animal.happiness <= 30">
                <mat-icon>sentiment_very_dissatisfied</mat-icon>
                Triste
              </button>
              <button mat-button (click)="setHappiness(50)" class="quick-btn warning-btn"
                      [class.active]="animal.happiness > 30 && animal.happiness <= 70">
                <mat-icon>sentiment_neutral</mat-icon>
                Content
              </button>
              <button mat-button (click)="setHappiness(100)" class="quick-btn good-btn"
                      [class.active]="animal.happiness > 70">
                <mat-icon>sentiment_very_satisfied</mat-icon>
                Joyeux
              </button>
            </div>
            
            <div class="happiness-bar-visual">
              <div class="happiness-bar">
                <div class="happiness-fill" 
                     [style.width.%]="animal.happiness"
                     [class.critical]="animal.happiness <= 30"
                     [class.warning]="animal.happiness > 30 && animal.happiness <= 70"
                     [class.good]="animal.happiness > 70"></div>
                <div class="happiness-markers">
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
              [disabled]="!animal.name || !animal.species" 
              class="confirm-btn">
        <mat-icon>add</mat-icon>
        Ajouter l'animal
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
      background: linear-gradient(135deg, #2d5016, #4a7c59);
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
      position: relative !important;
      z-index: 100 !important;
    }

    /* Texte noir visible */
    .form-field ::ng-deep .mdc-floating-label {
      color: #333 !important;
      font-weight: 600 !important;
    }

    .form-field ::ng-deep .mdc-floating-label--float-above {
      color: #2d5016 !important;
    }

    .form-field ::ng-deep .mat-mdc-form-field-outline-thick {
      color: #4a7c59 !important;
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

    .form-field ::ng-deep .mat-mdc-select-trigger {
      background: white !important;
      border-radius: 8px !important;
    }

    /* Section santé avec z-index plus faible */
    .health-section {
      background: #f8fffe;
      padding: 2rem;
      border-radius: 16px;
      border: 3px solid #e8f5e8;
      box-shadow: 0 4px 20px rgba(45, 80, 22, 0.1);
      position: relative;
      z-index: 1;
    }

    .health-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .health-icon {
      color: #ff6b35 !important;
      font-size: 1.5rem !important;
    }

    .health-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #333 !important;
    }

    .health-controls {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .health-display {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .health-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: #333 !important;
    }

    .health-status {
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 1rem;
    }

    .health-status.critical {
      background: #ffebee;
      color: #d32f2f !important;
    }

    .health-status.warning {
      background: #fff8e1;
      color: #f57c00 !important;
    }

    .health-status.good {
      background: #e8f5e8;
      color: #2e7d32 !important;
    }

    /* NOUVEAU SLIDER WRAPPER */
    .slider-wrapper {
      background: white;
      padding: 1.5rem;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      margin: 1rem 0;
    }

    .slider-labels {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .label-start { color: #d32f2f; }
    .label-middle { color: #f57c00; }
    .label-end { color: #2e7d32; }

    /* SLIDER AMÉLIORÉ */
    .slider-container {
      margin: 1rem 0;
      position: relative;
    }

    .health-slider {
      width: 100% !important;
      height: 48px !important;
    }

    .health-slider ::ng-deep .mdc-slider {
      height: 48px !important;
    }

    .health-slider ::ng-deep .mdc-slider__track {
      height: 8px !important;
      background: linear-gradient(90deg, #ffcdd2 0%, #fff3e0 50%, #e8f5e8 100%) !important;
    }

    .health-slider ::ng-deep .mdc-slider__track--active_fill {
      height: 8px !important;
      background: #ff6b35 !important;
    }

    .health-slider ::ng-deep .mdc-slider__thumb {
      width: 32px !important;
      height: 32px !important;
      border: 4px solid #ff6b35 !important;
      background: white !important;
      box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3) !important;
    }

    .health-slider ::ng-deep .mdc-slider__thumb:hover {
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

    .mark.critical { background: #ffebee; color: #d32f2f; }
    .mark.warning { background: #fff8e1; color: #f57c00; }
    .mark.good { background: #e8f5e8; color: #2e7d32; }

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
      background: #ffebee !important;
      color: #d32f2f !important;
    }

    .warning-btn {
      background: #fff8e1 !important;
      color: #f57c00 !important;
    }

    .good-btn {
      background: #e8f5e8 !important;
      color: #2e7d32 !important;
    }

    .quick-btn.active {
      border-color: currentColor !important;
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
    }

    /* BARRE VISUELLE AMÉLIORÉE */
    .health-bar-visual {
      margin-top: 1rem;
    }

    .health-bar {
      width: 100%;
      height: 20px;
      background: #e0e0e0;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }

    .health-fill {
      height: 100%;
      transition: all 0.3s ease;
      border-radius: 10px;
      position: relative;
    }

    .health-fill.critical {
      background: linear-gradient(45deg, #ff4444, #ff6b6b);
    }

    .health-fill.warning {
      background: linear-gradient(45deg, #ffa500, #ffcc00);
    }

    .health-fill.good {
      background: linear-gradient(45deg, #4caf50, #8bc34a);
    }

    .health-markers {
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

    /* SECTION BONHEUR - STYLES SIMILAIRES À LA SANTÉ */
    .happiness-section {
      background: #f3e5f5;
      padding: 2rem;
      border-radius: 16px;
      border: 3px solid #e1bee7;
      box-shadow: 0 4px 20px rgba(156, 39, 176, 0.1);
      position: relative;
      z-index: 1;
    }

    .happiness-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .happiness-icon {
      color: #9c27b0 !important;
      font-size: 1.5rem !important;
    }

    .happiness-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #333 !important;
    }

    .happiness-controls {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .happiness-display {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .happiness-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: #333 !important;
    }

    .happiness-status {
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 1rem;
    }

    .happiness-status.critical {
      background: #fce4ec;
      color: #c2185b !important;
    }

    .happiness-status.warning {
      background: #f3e5f5;
      color: #9c27b0 !important;
    }

    .happiness-status.good {
      background: #e8f5e8;
      color: #2e7d32 !important;
    }

    .happiness-slider {
      width: 100% !important;
      height: 48px !important;
    }

    .happiness-slider ::ng-deep .mdc-slider {
      height: 48px !important;
    }

    .happiness-slider ::ng-deep .mdc-slider__track {
      height: 8px !important;
      background: linear-gradient(90deg, #fce4ec 0%, #f3e5f5 50%, #e8f5e8 100%) !important;
    }

    .happiness-slider ::ng-deep .mdc-slider__track--active_fill {
      height: 8px !important;
      background: #9c27b0 !important;
    }

    .happiness-slider ::ng-deep .mdc-slider__thumb {
      width: 32px !important;
      height: 32px !important;
      border: 4px solid #9c27b0 !important;
      background: white !important;
      box-shadow: 0 4px 12px rgba(156, 39, 176, 0.3) !important;
    }

    .happiness-slider ::ng-deep .mdc-slider__thumb:hover {
      transform: scale(1.1) !important;
    }

    .happiness-bar-visual {
      margin-top: 1rem;
    }

    .happiness-bar {
      width: 100%;
      height: 20px;
      background: #e0e0e0;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }

    .happiness-fill {
      height: 100%;
      transition: all 0.3s ease;
      border-radius: 10px;
      position: relative;
    }

    .happiness-fill.critical {
      background: linear-gradient(45deg, #e91e63, #f06292);
    }

    .happiness-fill.warning {
      background: linear-gradient(45deg, #9c27b0, #ba68c8);
    }

    .happiness-fill.good {
      background: linear-gradient(45deg, #4caf50, #8bc34a);
    }

    .happiness-markers {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
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
      background: linear-gradient(45deg, #ff6b35, #f7931e) !important;
      color: white !important;
      border-radius: 12px !important;
      font-weight: 600 !important;
      padding: 0.5rem 2rem !important;
      transition: all 0.3s ease !important;
    }

    .confirm-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4) !important;
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
      background-color: #e8f5e8 !important;
    }

    ::ng-deep .mat-mdc-option:hover {
      background-color: #f0f9f0 !important;
    }

    /* Panel du select avec fond blanc */
    ::ng-deep .mat-mdc-select-panel {
      background: white !important;
      border-radius: 12px !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15) !important;
      border: 2px solid #e8f5e8 !important;
    }
  `]
})
export class AjoutAnimalDialogComponent { // ✅ NOM CORRECT !
  animal = {
    name: '',
    species: '',
    health: 50,
    happiness: 50
  };

  constructor(
    public dialogRef: MatDialogRef<AjoutAnimalDialogComponent>,
    private cdr: ChangeDetectorRef
  ) {}

  // MÉTHODES POUR LA SANTÉ
  getHealthStatus(): string {
    if (this.animal.health > 70) return 'Excellente santé';
    if (this.animal.health > 30) return 'Santé moyenne';
    return 'Santé critique';
  }

  setHealth(value: number): void {
    this.animal.health = value;
    this.cdr.detectChanges();
  }

  onHealthChange(event: any): void {
    this.animal.health = event.target.value;
    this.cdr.detectChanges();
  }

  // MÉTHODES POUR LE BONHEUR
  getHappinessStatus(): string {
    if (this.animal.happiness > 70) return 'Très joyeux';
    if (this.animal.happiness > 30) return 'Content';
    return 'Triste';
  }

  setHappiness(value: number): void {
    this.animal.happiness = value;
    this.cdr.detectChanges();
  }

  onHappinessChange(event: any): void {
    this.animal.happiness = event.target.value;
    this.cdr.detectChanges();
  }

  formatSliderLabel(value: number): string {
    return `${value}%`;
  }

  confirmer(): void {
    if (this.animal.name && this.animal.species) {
      console.log('Animal créé:', this.animal);
      this.dialogRef.close(this.animal);
    }
  }

  annuler(): void {
    this.dialogRef.close();
  }
}
