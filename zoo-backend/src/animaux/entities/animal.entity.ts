import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Enclos } from '../../enclos/entities/enclos.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  species: string;

  @Column({ type: 'int', default: 100 })
  health: number;

  @ManyToOne(() => Enclos, enclos => enclos.animals, { 
    nullable: true,
    onDelete: 'SET NULL'
  })
  enclos?: Enclos;
}
