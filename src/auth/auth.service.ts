import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDTO } from './auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly salt = 12;

  constructor(private db: PrismaService) {}

  async signUp(data: SignUpDTO) {
    const emailExists = Boolean(await this.db.user.findUnique({
      where: {
        email: data.email,
      },
    }));

    if (emailExists) {
      throw new ConflictException()
    }

    data.password = this.hash(data.password);

    return await this.db.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  hash(text: string): string {
    return bcrypt.hashSync(text, this.salt)
  }
}
