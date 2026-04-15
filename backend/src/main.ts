import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // 2. Налаштовуємо глобальну валідацію
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // видаляти поля, яких немає в DTO
      forbidNonWhitelisted: true, // видавати помилку, якщо прислали зайве
      transform: true,         // автоматично перетворювати типи (н-р, рядок "1" у число 1)
    }),
  );

  await app.listen(3000);
  
  console.log(`\n🚀 Backend запрацював!`);
  console.log(`API доступне за адресою: http://localhost:3000/books`);
}
bootstrap();