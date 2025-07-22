import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Animal } from '../../animaux/entities/animal.entity';

@Entity()
export class Enclos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  type: string;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'int', default: 100 })
  cleanliness: number;

  @OneToMany(() => Animal, animal => animal.enclos, {
    cascade: false, // Pas de cascade pour éviter les suppressions automatiques
    onDelete: 'SET NULL'
  })
  animals: Animal[];
}