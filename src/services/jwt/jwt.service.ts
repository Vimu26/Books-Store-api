// import { Injectable } from '@nestjs/common';
// import * as jwt from 'jsonwebtoken';

// @Injectable()
// export class JwtService {
//   private readonly secretKey = process.env.JWT_SECRET;

//   sign(payload: any): string {
//     return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
//   }

//   verify(token: string): any {
//     try {
//       return jwt.verify(token, this.secretKey);
//     } catch (error) {
//       return null;
//     }
//   }
// }
