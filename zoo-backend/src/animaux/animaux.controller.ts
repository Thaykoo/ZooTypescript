import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnimauxService } from './animaux.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalDto } from './dto/animal.dto';
import { FakeAuthGuard, FakeRolesGuard } from '../auth/fake-auth.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Animaux')
@Controller('animaux')
export class AnimauxController {
  constructor(private readonly animauxService: AnimauxService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel animal' })
  @ApiResponse({ status: 201, description: 'Animal créé', type: AnimalDto })
  create(@Body() createAnimalDto: CreateAnimalDto): Promise<AnimalDto> {
    return this.animauxService.create(createAnimalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les animaux' })
  @ApiResponse({ status: 200, description: 'Liste des animaux', type: [AnimalDto] })
  findAll(): Promise<AnimalDto[]> {
    return this.animauxService.findAll();
  }

  @Get(':id')
  @UseGuards(FakeAuthGuard)
  @ApiOperation({ summary: 'Récupérer un animal par ID (authentification requise)' })
  @ApiResponse({ status: 200, description: 'Animal trouvé', type: AnimalDto })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @ApiResponse({ status: 404, description: 'Animal non trouvé' })
  findOne(@Param('id') id: string): Promise<AnimalDto> {
    console.log(`📋 Contrôleur: Récupération animal #${id} (auth requise)`);
    return this.animauxService.findOne(+id);
  }

  @Get(':id/soigner')
  @UseGuards(FakeAuthGuard, FakeRolesGuard)
  @Roles('veterinaire')
  @ApiOperation({ summary: 'Soigner un animal (vétérinaire uniquement) - Remet health à 100' })
  @ApiResponse({ status: 200, description: 'Animal soigné avec succès', type: AnimalDto })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé - Rôle vétérinaire requis' })
  @ApiResponse({ status: 404, description: 'Animal non trouvé' })
  async soigner(@Param('id') id: string): Promise<AnimalDto> {
    console.log(`🩺 Contrôleur: DÉBUT soins animal #${id} (vétérinaire requis)`);
    console.log(`🩺 Contrôleur: Guards passés, appel du service...`);
    
    try {
      const animalSoigne = await this.animauxService.soigner(+id);
      console.log(`✅ Contrôleur: Animal #${id} soigné avec SUCCÈS, santé: ${animalSoigne.health}`);
      return animalSoigne;
    } catch (error) {
      console.error(`❌ Contrôleur: ERREUR soins animal #${id}:`, error);
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(FakeAuthGuard, FakeRolesGuard)
  @Roles('gardien')
  @ApiOperation({ summary: 'Supprimer un animal (gardien uniquement)' })
  @ApiResponse({ status: 200, description: 'Animal supprimé avec succès' })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé - Rôle gardien requis' })
  @ApiResponse({ status: 404, description: 'Animal non trouvé' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    console.log(`🗑️ Contrôleur: DÉBUT suppression animal #${id} (gardien requis)`);
    
    try {
      await this.animauxService.remove(+id);
      console.log(`✅ Contrôleur: Animal #${id} supprimé avec SUCCÈS`);
      return { message: `Animal #${id} supprimé avec succès` };
    } catch (error) {
      console.error(`❌ Contrôleur: ERREUR suppression animal #${id}:`, error);
      throw error;
    }
  }
}
