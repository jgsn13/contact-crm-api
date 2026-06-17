import { Controller, Get } from '@nestjs/common';
import { UserId } from 'src/user/user-id.decorator';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  async getSummary(@UserId() userId: string) {
    return await this.dashboardService.getSummary(userId);
  }
}
