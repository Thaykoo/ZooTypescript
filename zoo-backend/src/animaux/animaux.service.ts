import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalDto } from './dto/animal.dto';

@Injectable()
export class AnimauxService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<AnimalDto> {
    const animal = this.animalRepository.create(createAnimalDto);
    await this.animalRepository.save(animal);
    return this.toDto(animal);
  }

  async findAll(): Promise<AnimalDto[]> {
    const animals = await this.animalRepository.find();
    return animals.map(animal => this.toDto(animal));
  }

  async findOne(id: number): Promise<AnimalDto> {
    const animal = await this.animalRepository.findOne({ where: { id } });
    if (!animal) {
      throw new NotFoundException(`Animal #${id} non trouvé`);
    }
    return this.toDto(animal);
  }

  async soigner(id: number): Promise<AnimalDto> {
    console.log(`🩺 Service: Début soins pour animal #${id}`);
    
    // Trouver l'animal
    const animal = await this.animalRepository.findOne({ where: { id } });
    if (!animal) {
      console.log(`❌ Service: Animal #${id} non trouvé`);
      throw new NotFoundException(`Animal #${id} non trouvé`);
    }

    console.log(`🔍 Service: Animal trouvé - Santé actuelle: ${animal.health}`);

    // Remettre la santé à 100
    const ancienneSante = animal.health;
    animal.health = 100;
    
    try {
      // Sauvegarder les modifications
      const animalSoigne = await this.animalRepository.save(animal);
      console.log(`✅ Service: Animal #${id} soigné - Santé: ${ancienneSante} → ${animalSoigne.health}`);
      
      return this.toDto(animalSoigne);
    } catch (error) {
      console.error(`❌ Service: Erreur lors de la sauvegarde des soins:`, error);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    console.log(`🔍 Service: Recherche animal #${id} pour suppression`);
    
    const animal = await this.animalRepository.findOne({ where: { id } });
    if (!animal) {
      console.log(`❌ Service: Animal #${id} non trouvé`);
      throw new NotFoundException(`Animal #${id} non trouvé`);
    }

    try {
      const deleteResult = await this.animalRepository.delete(id);
      console.log(`✅ Service: Animal #${id} supprimé avec succès`);
    } catch (error) {
      console.error(`❌ Service: Erreur lors de la suppression:`, error);
      throw error;
    }
  }

  // Méthode pour convertir une entité en DTO
  private toDto(animal: Animal): AnimalDto {
    return {
      id: animal.id,
      name: animal.name,
      species: animal.species,
      health: animal.health,
    };
  }
}
