import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
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

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
