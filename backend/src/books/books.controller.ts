import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() { return this.booksService.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.booksService.findOne(id); }

  @Post()
  create(@Body() createBookDto: CreateBookDto) { return this.booksService.create(createBookDto); }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.booksService.remove(id); }
}