import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateEnclosDto {
  @ApiProperty({ description: 'Nom de l\'enclos', example: 'Savane' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Type d\'enclos', example: 'Extérieur' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ description: 'Capacité maximale d\'animaux dans l\'enclos', example: 5 })
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({ description: 'Niveau de propreté de l\'enclos (0-100)', example: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  cleanliness: number;
}