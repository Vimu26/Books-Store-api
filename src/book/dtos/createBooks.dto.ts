import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
}
