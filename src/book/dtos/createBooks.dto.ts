import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';
import { ICategory } from 'src/types/common.types';

export class CreateBooksDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(ICategory, { message: 'Enter Correct Category' })
  readonly category: ICategory;

  @IsEmpty()
  readonly user: User;
}
