import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnclosService } from './enclos.service';
import { EnclosController } from './enclos.controller';
import { Enclos } from './entities/enclos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enclos])],
  controllers: [EnclosController],
  providers: [EnclosService],
  exports: [EnclosService],
})
export class EnclosModule {}