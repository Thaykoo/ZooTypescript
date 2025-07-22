import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateVisiteDto {
  @ApiProperty({ description: 'Nom du visiteur', example: 'Jean Dupont' })
  @IsNotEmpty()
  @IsString()
  visiteurNom: string;

  @ApiProperty({ description: 'Email du visiteur', example: 'jean.dupont@email.com' })
  @IsEmail()
  visiteurEmail: string;

  @ApiProperty({ description: 'Nombre de personnes', example: 4 })
  @IsNumber()
  @Min(1)
  nombrePersonnes: number;

  @ApiProperty({ description: 'Prix de la visite', example: 25.50 })
  @IsNumber()
  @Min(0)
  prix: number;

  @ApiProperty({ description: 'Commentaire optionnel', example: 'Visite en famille', required: false })
  @IsOptional()
  @IsString()
  commentaire?: string;
}