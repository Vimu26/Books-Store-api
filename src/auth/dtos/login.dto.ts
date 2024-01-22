import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
