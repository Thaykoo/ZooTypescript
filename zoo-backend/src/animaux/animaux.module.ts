import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';
import { AnimauxController } from './animaux.controller';
import { AnimauxService } from './animaux.service';
import { Animal } from './entities/animal.entity';
import { FakeAuthGuard, FakeRolesGuard } from '../auth/fake-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimauxController],
  providers: [
    AnimauxService, 
    FakeAuthGuard, 
    FakeRolesGuard,
    Reflector // Nécessaire pour FakeRolesGuard
  ],
  exports: [AnimauxService],
})
export class AnimauxModule {}
