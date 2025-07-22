import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Activer CORS
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Zoo API')
    .setDescription('API pour gérer les animaux et enclos du zoo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Utiliser le port 3001
  await app.listen(3001);
  console.log('Application backend démarrée sur http://localhost:3001');
}
bootstrap();

