import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateSoigneurDto {
  @ApiProperty({ description: 'Nom du soigneur', example: 'Dr. Martin' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Spécialité du soigneur', example: 'Vétérinaire pour félins' })
  @IsString()
  specialite: string;

  @ApiProperty({ description: 'Années d\'expérience', example: 8, required: false })
  @IsOptional()
  @IsNumber()
  experience?: number;

  @ApiProperty({ description: 'Soigneur actif', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  actif?: boolean;
}
