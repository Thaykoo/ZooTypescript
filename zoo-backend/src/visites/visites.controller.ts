import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VisitesService } from './visites.service';
import { CreateVisiteDto } from './dto/create-visite.dto';
import { VisiteDto } from './dto/visite.dto';

@ApiTags('Visites')
@Controller('visites')
export class VisitesController {
  constructor(private readonly visitesService: VisitesService) {}

  @Post()
  @ApiOperation({ summary: 'Enregistrer une nouvelle visite' })
  @ApiResponse({ status: 201, description: 'Visite enregistrée', type: VisiteDto })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() createVisiteDto: CreateVisiteDto): Promise<VisiteDto> {
    return this.visitesService.create(createVisiteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les visites' })
  @ApiResponse({ status: 200, description: 'Liste des visites', type: [VisiteDto] })
  findAll(): Promise<VisiteDto[]> {
    return this.visitesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une visite par ID' })
  @ApiResponse({ status: 200, description: 'Visite trouvée', type: VisiteDto })
  @ApiResponse({ status: 404, description: 'Visite non trouvée' })
  findOne(@Param('id') id: string): Promise<VisiteDto> {
    return this.visitesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une visite' })
  @ApiResponse({ status: 200, description: 'Visite modifiée', type: VisiteDto })
  @ApiResponse({ status: 404, description: 'Visite non trouvée' })
  update(@Param('id') id: string, @Body() updateVisiteDto: Partial<CreateVisiteDto>): Promise<VisiteDto> {
    return this.visitesService.update(+id, updateVisiteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une visite' })
  @ApiResponse({ status: 200, description: 'Visite supprimée' })
  @ApiResponse({ status: 404, description: 'Visite non trouvée' })
  remove(@Param('id') id: string): Promise<void> {
    return this.visitesService.remove(+id);
  }
}