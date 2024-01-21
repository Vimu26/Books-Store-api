import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Book } from 'src/schemas/book.schema';
import { BookService } from './book.service';
import { BooksDto } from './dtos/books.dto';

@Controller('books')
export class BookController {
  constructor(private booksService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.booksService.getAll();
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
