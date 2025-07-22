import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalDto {
  @ApiProperty({ description: 'Nom de l\'animal', example: 'Lion' })
  name: string;

  @ApiProperty({ description: 'Espèce de l\'animal', example: 'Félin' })
  species: string;

  @ApiProperty({ description: 'État de santé de l\'animal (0-100)', example: 100 })
  health: number;
}
