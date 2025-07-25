import { ApiProperty } from '@nestjs/swagger';

export class SoigneurDto {
  @ApiProperty({ description: 'ID unique du soigneur' })
  id: number;

  @ApiProperty({ description: 'Nom du soigneur' })
  name: string;

  @ApiProperty({ description: 'Spécialité du soigneur' })
  specialite: string;

  @ApiProperty({ description: 'Années d\'expérience' })
  experience: number;

  @ApiProperty({ description: 'Soigneur actif ou non' })
  actif: boolean;
}
