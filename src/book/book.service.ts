import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/book/schemas/book.schema';
import { BooksDto } from './dtos/books.dto';

import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private booksModel: Model<Book>) {}

  async createBook(books: BooksDto): Promise<Book> {
    const newBook = new this.booksModel(books);
    return newBook.save();
  }

  async getAll(query: Query): Promise<Book[]> {
    const responsePerPage = 1;
    const currentPage = Number(query.page) || 1;
    const skip = responsePerPage * (currentPage - 1);
    const keyWord = query.keyWord
      ? {
          title: {
            $regex: query.keyWord,
            $options: 'i',
          },
        }
      : {};
    return this.booksModel
      .find({ ...keyWord })
      .limit(responsePerPage)
      .skip(skip)
      .exec();
  }

  async getById(bookId: string): Promise<Book> {
    const book = await this.booksModel.findById(bookId).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
    return book;
  }

  async updateBook(bookId: string, booksDto: BooksDto): Promise<Book> {
    const updatedBook = await this.booksModel
      .findByIdAndUpdate(bookId, booksDto, { new: true })
      .exec();
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
    return updatedBook;
  }

  async deleteBook(bookId: string): Promise<Book> {
    const deletedBook = await this.booksModel.findByIdAndDelete(bookId).exec();
    if (!deletedBook) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
    return deletedBook;
  }
}
