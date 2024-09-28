import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1/public')

  const config = new DocumentBuilder()
  .setTitle('Área Pública')
  .setDescription('API pública sin acceso a la base de datos de ePayco.')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document)

  await app.listen(parseInt(process.env.PORT) || 3001);
}
bootstrap();