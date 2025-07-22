import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enclos } from './entities/enclos.entity';
import { CreateEnclosDto } from './dto/create-enclos.dto';
import { EnclosDto } from './dto/enclos.dto';

@Injectable()
export class EnclosService {
  constructor(
    @InjectRepository(Enclos)
    private readonly enclosRepository: Repository<Enclos>,
  ) {}

  async create(createEnclosDto: CreateEnclosDto): Promise<EnclosDto> {
    const enclos = this.enclosRepository.create(createEnclosDto);
    await this.enclosRepository.save(enclos);
    return this.toDto(enclos);
  }

  async findAll(): Promise<EnclosDto[]> {
    const enclosList = await this.enclosRepository.find();
    return enclosList.map(enclos => this.toDto(enclos));
  }

  async findOne(id: number): Promise<EnclosDto> {
    const enclos = await this.enclosRepository.findOne({ where: { id } });
    if (!enclos) {
      throw new NotFoundException(`Enclos #${id} non trouvé`);
    }
    return this.toDto(enclos);
  }

  async nettoyer(id: number): Promise<EnclosDto> {
    const enclos = await this.findOneEntity(id);
    enclos.cleanliness = 100;
    await this.enclosRepository.save(enclos);
    return this.toDto(enclos);
  }

  async remove(id: number): Promise<void> {
    const enclos = await this.findOneEntity(id);
    await this.enclosRepository.remove(enclos);
  }

  // Méthode utilitaire pour trouver un enclos par ID
  private async findOneEntity(id: number): Promise<Enclos> {
    const enclos = await this.enclosRepository.findOne({ where: { id } });
    if (!enclos) {
      throw new NotFoundException(`Enclos #${id} non trouvé`);
    }
    return enclos;
  }

  // Méthode pour convertir une entité en DTO
  private toDto(enclos: Enclos): EnclosDto {
    return {
      id: enclos.id,
      name: enclos.name,
      type: enclos.type,
      capacity: enclos.capacity,
      cleanliness: enclos.cleanliness,
    };
  }
}
