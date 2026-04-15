import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

export interface Book {
  id: number;
  title: string;
  authorId: number;
  genre: string;
}

@Injectable()
export class BooksService {
  private books = [
  { 
    id: 1, 
    title: "The Art of War", 
    authorId: 1, 
    genre: "Strategy/Business" 
  },
  { 
    id: 2, 
    title: "The Godfather", 
    authorId: 2, 
    genre: "Crime Drama" 
  },
  { 
    id: 3, 
    title: "Wise Guy", 
    authorId: 3, 
    genre: "Biography" 
  }
];

  findAll() {
    return this.books;
  }

  create(dto: CreateBookDto) {
    const newBook: Book = { id: Date.now(), ...dto };
    this.books.push(newBook);
    return newBook;
  }

  remove(id: number) {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) throw new NotFoundException('Книгу не знайдено');
    this.books.splice(index, 1);
    return { success: true };
  }
}