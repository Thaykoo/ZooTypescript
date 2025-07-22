import { ApiProperty } from '@nestjs/swagger';

export class AnimalDto {
  @ApiProperty({ description: 'ID unique de l\'animal' })
  id: number;

  @ApiProperty({ description: 'Nom de l\'animal' })
  name: string;

  @ApiProperty({ description: 'Espèce de l\'animal' })
  species: string;

  @ApiProperty({ description: 'État de santé de l\'animal (0-100)' })
  health: number;
}