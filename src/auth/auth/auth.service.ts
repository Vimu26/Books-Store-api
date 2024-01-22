import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from '../dtos/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private usersModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto): Promise<{ user: SignUpDto }> {
    const { name, email, password } = data;

    // Check if the email is already in use
    const existingUser = await this.usersModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    // Hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new this.usersModel({
      name,
      email,
      password: hashPassword,
    });

    // Save the user to the database
    const user = await newUser.save();
    return { user };
  }

  async signIn(data: LoginDto): Promise<{ token: string }> {
    const { email, password } = data;

    const user = await this.usersModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user.id });

    return { token };
  }
}
