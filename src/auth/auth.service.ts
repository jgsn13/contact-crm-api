import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtPayload, SignInDTO, SignUpDTO } from './auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly salt = 12;
  private readonly secret = 'secs-2025';

  constructor(
    private db: PrismaService,
   private jwt: JwtService,
  ) {}

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

  async signIn(data: SignInDTO) {
    const user = await this.db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException()
    }

    const isValidPassword = this.compare(data.password, user.password)
    if (!isValidPassword) {
      throw new UnauthorizedException()
    }

    const token = this.login({ id: user.id });

    return { token };
  }

  hash(text: string): string {
    return bcrypt.hashSync(text, this.salt)
  }

  compare(text: string, hash: string): boolean {
    return bcrypt.compareSync(text, hash);
  }

  login(payload: JwtPayload): string {
    return this.jwt.sign(payload, { secret: this.secret });
  }

  verify(token: string) {
    return this.jwt.verify<JwtPayload>(token, { secret: this.secret })
  }
}
