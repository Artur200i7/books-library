import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Додай цей імпорт

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  // Додаємо автоматичну валідацію всіх вхідних даних
  app.useGlobalPipes(new ValidationPipe()); 
  
  await app.listen(3000);
}
bootstrap();