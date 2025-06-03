import { Controller, Get } from '@nestjs/common';
import { UserId } from './user-id.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {}

  @Get('profile')
  async profile(@UserId() userId: string) {
    return await this.userService.getUserById(userId);
  }
}
