import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('soigneurs')
export class SoigneurEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID unique du soigneur' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Nom du soigneur' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Spécialité du soigneur' })
  specialite: string;

  @Column({ default: 5 })
  @ApiProperty({ description: 'Années d\'expérience' })
  experience: number;

  @Column({ default: true })
  @ApiProperty({ description: 'Soigneur actif ou non' })
  actif: boolean;
}
