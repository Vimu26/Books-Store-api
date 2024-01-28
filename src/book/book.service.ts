import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Book } from 'src/book/schemas/book.schema';
import { CreateBooksDto } from './dtos/createBooks.dto';

import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private booksModel: Model<Book>) {}

  async createBook(books: CreateBooksDto, user: User): Promise<Book> {
    const data = Object.assign(books, { user: user._id });
    const newBook = new this.booksModel(data);
    return newBook.save();
  }

  //pagination -  add it later
  // async getAll(query: Query): Promise<Book[]> {
  //   const responsePerPage = 1;
  //   const currentPage = Number(query.page) || 1;
  //   const skip = responsePerPage * (currentPage - 1);
  //   const keyWord = query.keyWord
  //     ? {
  //         title: {
  //           $regex: query.keyWord,
  //           $options: 'i',
  //         },
  //       }
  //     : {};
  //   return this.booksModel
  //     .find({ ...keyWord })
  //     .limit(responsePerPage)
  //     .skip(skip)
  //     .exec();
  // }

  async getAll(query: Query): Promise<Book[]> {
    const keyWord = query.keyWord
      ? {
          title: {
            $regex: query.keyWord,
            $options: 'i',
          },
        }
      : {};
    return this.booksModel.find({ ...keyWord }).exec();
  }

  async getById(bookId: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(bookId);

    if (!isValidId) {
      throw new BadRequestException('Invalid ID');
    }

    const book = await this.booksModel.findById(bookId).exec();

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
    return book;
  }

  async updateBook(
    bookId: string,
    CreateBooksDto: CreateBooksDto,
  ): Promise<Book> {
    const updatedBook = await this.booksModel
      .findByIdAndUpdate(bookId, CreateBooksDto, { new: true })
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
