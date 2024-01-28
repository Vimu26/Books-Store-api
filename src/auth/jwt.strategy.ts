import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HashingService } from 'src/services/hashing/hashing.service';
import { User } from './schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private usersModel: Model<User>,
    private jwtService: JwtService,
    private passwordHashingService: HashingService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: any }) {
    const { sub } = payload;
    const user = await this.usersModel.findById(sub);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
