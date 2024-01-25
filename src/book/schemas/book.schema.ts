import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICategory } from 'src/types/common.types';

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  category: ICategory;
}

export const BookSchema = SchemaFactory.createForClass(Book);