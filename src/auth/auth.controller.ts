import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() body: SignUpDTO
  ) {
    return await this.authService.signUp(body);
  }

  @Post('sign-in')
  async signIn(
    @Body() body: SignInDTO
  ) {
    return await this.authService.signIn(body)
  }
}
