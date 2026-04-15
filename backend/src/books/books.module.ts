import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  controllers: [BooksController], // Реєструємо контролер
  providers: [BooksService],       // Реєструємо сервіс
})
export class BooksModule {}