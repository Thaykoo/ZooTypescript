import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoigneursController } from './soigneurs.controller';
import { SoigneursService } from './soigneurs.service';
import { SoigneurEntity } from './entities/soigneur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SoigneurEntity])],
  controllers: [SoigneursController],
  providers: [SoigneursService],
  exports: [SoigneursService],
})
export class SoigneursModule {}
