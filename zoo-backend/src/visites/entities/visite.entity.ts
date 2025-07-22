import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Visite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  visiteurNom: string;

  @Column({ length: 100 })
  visiteurEmail: string;

  @Column()
  nombrePersonnes: number;

  @CreateDateColumn()
  dateVisite: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  prix: number;

  @Column({ length: 500, nullable: true })
  commentaire?: string;
}