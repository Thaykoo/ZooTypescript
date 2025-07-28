import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimauxController } from './animaux.controller';
import { AnimauxService } from './animaux.service';
import { Animal } from './entities/animal.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Animal]),
    AuthModule
  ],
  controllers: [AnimauxController],
  providers: [AnimauxService],
  exports: [AnimauxService],
})
export class AnimauxModule {}
