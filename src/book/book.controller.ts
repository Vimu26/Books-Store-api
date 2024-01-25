import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Book } from 'src/book/schemas/book.schema';
import { BookService } from './book.service';
import { BooksDto } from './dtos/books.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('books')
export class BookController {
  constructor(private booksService: BookService) {}

  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return await this.booksService.getAll(query);
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return await this.booksService.getById(id);
  }

  @Post()
  async create(@Body() requestBody: BooksDto): Promise<Book> {
    return await this.booksService.createBook(requestBody);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') bookId: string,
    @Body() requestBody: BooksDto,
  ): Promise<Book> {
    return this.booksService.updateBook(bookId, requestBody);
  }

  @Delete(':id')
  async delete(@Param('id') bookId: string): Promise<Book> {
    return this.booksService.deleteBook(bookId);
  }
}
