import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visite } from './entities/visite.entity';
import { CreateVisiteDto } from './dto/create-visite.dto';
import { VisiteDto } from './dto/visite.dto';

@Injectable()
export class VisitesService {
  constructor(
    @InjectRepository(Visite)
    private readonly visiteRepository: Repository<Visite>,
  ) {}

  async create(createVisiteDto: CreateVisiteDto): Promise<VisiteDto> {
    const visite = this.visiteRepository.create(createVisiteDto);
    await this.visiteRepository.save(visite);
    return this.toDto(visite);
  }

  async findAll(): Promise<VisiteDto[]> {
    const visites = await this.visiteRepository.find({
      order: { dateVisite: 'DESC' }
    });
    return visites.map(visite => this.toDto(visite));
  }

  async findOne(id: number): Promise<VisiteDto> {
    const visite = await this.visiteRepository.findOne({ where: { id } });
    if (!visite) {
      throw new NotFoundException(`Visite #${id} non trouvée`);
    }
    return this.toDto(visite);
  }

  async update(id: number, updateData: Partial<CreateVisiteDto>): Promise<VisiteDto> {
    const visite = await this.findOneEntity(id);
    Object.assign(visite, updateData);
    await this.visiteRepository.save(visite);
    return this.toDto(visite);
  }

  async remove(id: number): Promise<void> {
    const visite = await this.findOneEntity(id);
    await this.visiteRepository.remove(visite);
  }

  // Méthode utilitaire pour trouver une visite par ID
  private async findOneEntity(id: number): Promise<Visite> {
    const visite = await this.visiteRepository.findOne({ where: { id } });
    if (!visite) {
      throw new NotFoundException(`Visite #${id} non trouvée`);
    }
    return visite;
  }

  // Méthode pour convertir une entité en DTO
  private toDto(visite: Visite): VisiteDto {
    return {
      id: visite.id,
      visiteurNom: visite.visiteurNom,
      visiteurEmail: visite.visiteurEmail,
      nombrePersonnes: visite.nombrePersonnes,
      dateVisite: visite.dateVisite,
      prix: visite.prix,
      commentaire: visite.commentaire,
    };
  }
}