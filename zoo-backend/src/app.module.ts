import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimauxModule } from './animaux/animaux.module';
import { EnclosModule } from './enclos/enclos.module';
import { VisitesModule } from './visites/visites.module';
import { AuthModule } from './auth/auth.module';
import { Animal } from './animaux/entities/animal.entity';
import { Enclos } from './enclos/entities/enclos.entity';
import { Visite } from './visites/entities/visite.entity';
import { DevAuthMiddleware } from './auth/dev-auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'zoo_user',
        password: 'zoo_password',
        database: 'zoo_db',
        entities: [Animal, Enclos, Visite],
        synchronize: true, // Important : crée les tables automatiquement
        logging: true, // Important : affiche les requêtes SQL dans la console
      }),
    }),
    AnimauxModule,
    EnclosModule,
    VisitesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DevAuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
