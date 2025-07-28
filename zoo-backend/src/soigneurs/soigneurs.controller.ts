import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SoigneursService } from './soigneurs.service';
import { CreateSoigneurDto } from './dto/create-soigneur.dto';
import { SoigneurDto } from './dto/soigneur.dto';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Soigneurs')
@Controller('soigneurs')
export class SoigneursController {
  constructor(private readonly soigneursService: SoigneursService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un nouveau soigneur (admin uniquement)' })
  @ApiResponse({ status: 201, description: 'Soigneur créé avec succès', type: SoigneurDto })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé - Rôle admin requis' })
  create(@Body() createSoigneurDto: CreateSoigneurDto): Promise<SoigneurDto> {
    console.log('🏥 Contrôleur: Création nouveau soigneur (admin requis)');
    return this.soigneursService.create(createSoigneurDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les soigneurs' })
  @ApiResponse({ status: 200, description: 'Liste des soigneurs', type: [SoigneurDto] })
  findAll(): Promise<SoigneurDto[]> {
    console.log('🏥 Contrôleur: Récupération de tous les soigneurs');
    return this.soigneursService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer un soigneur par ID (authentification requise)' })
  @ApiResponse({ status: 200, description: 'Soigneur trouvé', type: SoigneurDto })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @ApiResponse({ status: 404, description: 'Soigneur non trouvé' })
  findOne(@Param('id') id: string): Promise<SoigneurDto> {
    console.log(`🏥 Contrôleur: Récupération soigneur #${id} (auth requise)`);
    return this.soigneursService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un soigneur (admin uniquement)' })
  @ApiResponse({ status: 200, description: 'Soigneur supprimé avec succès' })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé - Rôle admin requis' })
  @ApiResponse({ status: 404, description: 'Soigneur non trouvé' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    console.log(`🏥 Contrôleur: Suppression soigneur #${id} (admin requis)`);
    
    try {
      await this.soigneursService.remove(+id);
      console.log(`✅ Contrôleur: Soigneur #${id} supprimé avec succès`);
      return { message: `Soigneur #${id} supprimé avec succès` };
    } catch (error) {
      console.error(`❌ Contrôleur: Erreur suppression soigneur #${id}:`, error);
      throw error;
    }
  }
}
