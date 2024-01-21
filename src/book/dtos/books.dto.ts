import { Category } from 'src/types/common.types';

export class BooksDto {
  readonly title: string;
  readonly author: string;
  readonly description: string;
  readonly price: number;
  readonly category: Category;
}
