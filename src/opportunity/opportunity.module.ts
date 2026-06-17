import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OpportunityController } from './opportunity.controller';
import { OpportunityService } from './opportunity.service';

@Module({
  providers: [PrismaService, OpportunityService],
  controllers: [OpportunityController],
})
export class OpportunityModule {}
