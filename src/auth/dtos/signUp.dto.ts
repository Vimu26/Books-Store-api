import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
