import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { OpportunityModule } from './opportunity/opportunity.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [AuthModule, UserModule, ContactModule, OpportunityModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
