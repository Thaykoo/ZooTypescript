import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EnclosService } from './enclos.service';
import { CreateEnclosDto } from './dto/create-enclos.dto';
import { EnclosDto } from './dto/enclos.dto';

@ApiTags('Enclos')
@Controller('enclos')
export class EnclosController {
  constructor(private readonly enclosService: EnclosService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel enclos' })
  @ApiResponse({ status: 201, description: 'Enclos créé', type: EnclosDto })
  create(@Body() createEnclosDto: CreateEnclosDto): Promise<EnclosDto> {
    return this.enclosService.create(createEnclosDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les enclos' })
  @ApiResponse({ status: 200, description: 'Liste des enclos', type: [EnclosDto] })
  findAll(): Promise<EnclosDto[]> {
    return this.enclosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un enclos par ID' })
  @ApiResponse({ status: 200, description: 'Enclos trouvé', type: EnclosDto })
  @ApiResponse({ status: 404, description: 'Non trouvé' })
  findOne(@Param('id') id: string): Promise<EnclosDto> {
    return this.enclosService.findOne(+id);
  }

  @Patch(':id/nettoyer')
  @ApiOperation({ summary: 'Nettoyer un enclos' })
  @ApiResponse({ status: 200, description: 'Enclos nettoyé', type: EnclosDto })
  @ApiResponse({ status: 404, description: 'Non trouvé' })
  nettoyer(@Param('id') id: string): Promise<EnclosDto> {
    return this.enclosService.nettoyer(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un enclos' })
  @ApiResponse({ status: 200, description: 'Enclos supprimé' })
  @ApiResponse({ status: 404, description: 'Non trouvé' })
  remove(@Param('id') id: string): Promise<void> {
    return this.enclosService.remove(+id);
  }
}
