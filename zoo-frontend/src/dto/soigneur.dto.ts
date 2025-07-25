export interface SoigneurDto {
  id: number;
  name: string;
  specialite: string;
  experience: number;
  actif: boolean;
}

export interface CreateSoigneurDto {
  name: string;
  specialite: string;
  experience?: number;
  actif?: boolean;
}
