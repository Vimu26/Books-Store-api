import {
  IsEnum,
  IsOptional,
  IsNumber,
  IsString,
  IsEmpty,
} from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';
import { ICategory } from 'src/types/common.types';

export class UpdateBooksDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsEnum(ICategory, { message: 'Enter Correct Category' })
  readonly category: ICategory;

  @IsEmpty()
  readonly user: User;
}
