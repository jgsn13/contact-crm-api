import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let prisma: {
    contact: {
      count: jest.Mock;
    };
    salesOpportunity: {
      count: jest.Mock;
      aggregate: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      contact: {
        count: jest.fn(),
      },
      salesOpportunity: {
        count: jest.fn(),
        aggregate: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the CRM summary for the authenticated user', async () => {
    prisma.contact.count.mockResolvedValue(3);
    prisma.salesOpportunity.count
      .mockResolvedValueOnce(5)
      .mockResolvedValueOnce(2)
      .mockResolvedValueOnce(1);
    prisma.salesOpportunity.aggregate
      .mockResolvedValueOnce({
        _sum: {
          estimatedValue: 10000,
        },
      })
      .mockResolvedValueOnce({
        _sum: {
          estimatedValue: 4000,
        },
      });

    await expect(service.getSummary('user-id')).resolves.toEqual({
      totalContacts: 3,
      totalOpportunities: 5,
      wonOpportunities: 2,
      lostOpportunities: 1,
      totalEstimatedValue: 10000,
      totalWonValue: 4000,
    });
  });

  it('should use zero when aggregate sums are empty', async () => {
    prisma.contact.count.mockResolvedValue(0);
    prisma.salesOpportunity.count
      .mockResolvedValueOnce(0)
      .mockResolvedValueOnce(0)
      .mockResolvedValueOnce(0);
    prisma.salesOpportunity.aggregate
      .mockResolvedValueOnce({
        _sum: {
          estimatedValue: null,
        },
      })
      .mockResolvedValueOnce({
        _sum: {
          estimatedValue: null,
        },
      });

    await expect(service.getSummary('user-id')).resolves.toEqual({
      totalContacts: 0,
      totalOpportunities: 0,
      wonOpportunities: 0,
      lostOpportunities: 0,
      totalEstimatedValue: 0,
      totalWonValue: 0,
    });
  });
});
