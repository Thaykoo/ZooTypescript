import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoigneurEntity } from './entities/soigneur.entity';
import { CreateSoigneurDto } from './dto/create-soigneur.dto';
import { SoigneurDto } from './dto/soigneur.dto';

@Injectable()
export class SoigneursService {
  constructor(
    @InjectRepository(SoigneurEntity)
    private soigneursRepository: Repository<SoigneurEntity>,
  ) {}

  async create(createSoigneurDto: CreateSoigneurDto): Promise<SoigneurDto> {
    console.log('🏥 Service: Création d\'un nouveau soigneur');
    const soigneur = this.soigneursRepository.create(createSoigneurDto);
    const savedSoigneur = await this.soigneursRepository.save(soigneur);
    console.log(`✅ Service: Soigneur créé avec ID ${savedSoigneur.id}`);
    return savedSoigneur;
  }

  async findAll(): Promise<SoigneurDto[]> {
    console.log('🏥 Service: Récupération de tous les soigneurs');
    const soigneurs = await this.soigneursRepository.find();
    console.log(`✅ Service: ${soigneurs.length} soigneurs trouvés`);
    return soigneurs;
  }

  async findOne(id: number): Promise<SoigneurDto> {
    console.log(`🏥 Service: Recherche soigneur avec ID ${id}`);
    const soigneur = await this.soigneursRepository.findOne({ where: { id } });
    
    if (!soigneur) {
      console.log(`❌ Service: Soigneur avec ID ${id} introuvable`);
      throw new NotFoundException(`Soigneur avec ID ${id} introuvable`);
    }
    
    console.log(`✅ Service: Soigneur ${id} trouvé: ${soigneur.name}`);
    return soigneur;
  }

  async remove(id: number): Promise<void> {
    console.log(`🏥 Service: Suppression soigneur avec ID ${id}`);
    const result = await this.soigneursRepository.delete(id);
    
    if (result.affected === 0) {
      console.log(`❌ Service: Soigneur avec ID ${id} introuvable pour suppression`);
      throw new NotFoundException(`Soigneur avec ID ${id} introuvable`);
    }
    
    console.log(`✅ Service: Soigneur ${id} supprimé avec succès`);
  }
}
