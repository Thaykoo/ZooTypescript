import { ApiProperty } from '@nestjs/swagger';

export class VisiteDto {
  @ApiProperty({ description: 'ID unique de la visite' })
  id: number;

  @ApiProperty({ description: 'Nom du visiteur' })
  visiteurNom: string;

  @ApiProperty({ description: 'Email du visiteur' })
  visiteurEmail: string;

  @ApiProperty({ description: 'Nombre de personnes' })
  nombrePersonnes: number;

  @ApiProperty({ description: 'Date de la visite' })
  dateVisite: Date;

  @ApiProperty({ description: 'Prix de la visite' })
  prix: number;

  @ApiProperty({ description: 'Commentaire', required: false })
  commentaire?: string;
}