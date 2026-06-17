import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private db: PrismaService) {}

  async getSummary(userId: string) {
    const [
      totalContacts,
      totalOpportunities,
      wonOpportunities,
      lostOpportunities,
      opportunityValues,
      wonValues,
    ] = await Promise.all([
      this.db.contact.count({
        where: {
          userId,
        },
      }),
      this.db.salesOpportunity.count({
        where: {
          contact: {
            userId,
          },
        },
      }),
      this.db.salesOpportunity.count({
        where: {
          status: 'won',
          contact: {
            userId,
          },
        },
      }),
      this.db.salesOpportunity.count({
        where: {
          status: 'lost',
          contact: {
            userId,
          },
        },
      }),
      this.db.salesOpportunity.aggregate({
        where: {
          contact: {
            userId,
          },
        },
        _sum: {
          estimatedValue: true,
        },
      }),
      this.db.salesOpportunity.aggregate({
        where: {
          status: 'won',
          contact: {
            userId,
          },
        },
        _sum: {
          estimatedValue: true,
        },
      }),
    ]);

    return {
      totalContacts,
      totalOpportunities,
      wonOpportunities,
      lostOpportunities,
      totalEstimatedValue: opportunityValues._sum.estimatedValue ?? 0,
      totalWonValue: wonValues._sum.estimatedValue ?? 0,
    };
  }
}
