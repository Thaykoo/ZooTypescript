import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimauxModule } from './animaux/animaux.module';
import { EnclosModule } from './enclos/enclos.module';
import { VisitesModule } from './visites/visites.module';
import { SoigneursModule } from './soigneurs/soigneurs.module';
import { AuthModule } from './auth/auth.module';
import { Animal } from './animaux/entities/animal.entity';
import { Enclos } from './enclos/entities/enclos.entity';
import { Visite } from './visites/entities/visite.entity';
import { SoigneurEntity } from './soigneurs/entities/soigneur.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Animal, Enclos, Visite, SoigneurEntity],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
        logging: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
    AnimauxModule,
    EnclosModule,
    VisitesModule,
    SoigneursModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
