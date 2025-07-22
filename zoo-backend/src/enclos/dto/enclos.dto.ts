import { ApiProperty } from '@nestjs/swagger';

export class EnclosDto {
  @ApiProperty({ description: 'ID unique de l\'enclos' })
  id: number;

  @ApiProperty({ description: 'Nom de l\'enclos' })
  name: string;

  @ApiProperty({ description: 'Type d\'enclos' })
  type: string;

  @ApiProperty({ description: 'Capacité maximale d\'animaux dans l\'enclos' })
  capacity: number;

  @ApiProperty({ description: 'Niveau de propreté de l\'enclos (0-100)' })
  cleanliness: number;
}