import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books = [
    { id: 1, title: 'The Art of War', authorId: 1, genre: 'Strategy' },
    { id: 2, title: 'The Godfather', authorId: 2, genre: 'Crime' },
  ];
  private nextId = 3;

  findAll() { return this.books; }

  findOne(id: number) {
    const book = this.books.find(b => b.id === id);
    if (!book) throw new NotFoundException('Книгу не знайдено');
    return book;
  }

  create(createBookDto: CreateBookDto) {
    const newBook = { id: this.nextId++, ...createBookDto };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) throw new NotFoundException('Книгу не знайдено');
    this.books[index] = { ...this.books[index], ...updateBookDto };
    return this.books[index];
  }

  remove(id: number) {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) throw new NotFoundException('Книгу не знайдено');
    this.books.splice(index, 1);
    return { message: 'Видалено успішно' };
  }
}