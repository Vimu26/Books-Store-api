import { IsEnum, IsOptional, IsNumber, IsString } from 'class-validator';
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
}
