import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { OpportunityService } from './opportunity.service';

describe('OpportunityService', () => {
  let service: OpportunityService;
  let prisma: {
    contact: {
      findFirst: jest.Mock;
    };
    salesOpportunity: {
      create: jest.Mock;
      findMany: jest.Mock;
      findFirst: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      contact: {
        findFirst: jest.fn(),
      },
      salesOpportunity: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpportunityService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<OpportunityService>(OpportunityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an opportunity for a contact owned by the user', async () => {
    prisma.contact.findFirst.mockResolvedValue({
      id: 'contact-id',
      userId: 'user-id',
    });
    prisma.salesOpportunity.create.mockResolvedValue({
      id: 'opportunity-id',
      contactId: 'contact-id',
      title: 'New contract',
      pipelineStage: 'proposal',
      estimatedValue: 1500,
      status: 'open',
    });

    await expect(service.create('user-id', {
      contactId: 'contact-id',
      title: 'New contract',
      pipelineStage: 'proposal',
      estimatedValue: 1500,
      status: 'open',
    })).resolves.toEqual({
      id: 'opportunity-id',
      contactId: 'contact-id',
      title: 'New contract',
      pipelineStage: 'proposal',
      estimatedValue: 1500,
      status: 'open',
    });
    expect(prisma.contact.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'contact-id',
        userId: 'user-id',
      },
    });
  });

  it('should throw when creating an opportunity for a missing contact', async () => {
    prisma.contact.findFirst.mockResolvedValue(null);

    await expect(service.create('user-id', {
      contactId: 'missing-contact',
      title: 'New contract',
      pipelineStage: 'proposal',
      estimatedValue: 1500,
      status: 'open',
    })).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should list opportunities owned by the user', async () => {
    const opportunities = [
      {
        id: 'opportunity-id',
        contactId: 'contact-id',
        title: 'New contract',
      },
    ];
    prisma.salesOpportunity.findMany.mockResolvedValue(opportunities);

    await expect(service.find('user-id')).resolves.toEqual(opportunities);
    expect(prisma.salesOpportunity.findMany).toHaveBeenCalledWith({
      where: {
        contact: {
          userId: 'user-id',
        },
      },
      include: {
        contact: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  });

  it('should update an opportunity owned by the user', async () => {
    prisma.salesOpportunity.findFirst.mockResolvedValue({
      id: 'opportunity-id',
      contactId: 'contact-id',
    });
    prisma.salesOpportunity.update.mockResolvedValue({
      id: 'opportunity-id',
      status: 'won',
    });

    await expect(service.update('user-id', 'opportunity-id', {
      status: 'won',
    })).resolves.toEqual({
      id: 'opportunity-id',
      status: 'won',
    });
    expect(prisma.salesOpportunity.update).toHaveBeenCalledWith({
      where: {
        id: 'opportunity-id',
      },
      data: {
        status: 'won',
      },
    });
  });

  it('should delete an opportunity owned by the user', async () => {
    prisma.salesOpportunity.findFirst.mockResolvedValue({
      id: 'opportunity-id',
    });
    prisma.salesOpportunity.delete.mockResolvedValue({
      id: 'opportunity-id',
    });

    await expect(service.delete('user-id', 'opportunity-id')).resolves.toBeUndefined();
    expect(prisma.salesOpportunity.delete).toHaveBeenCalledWith({
      where: {
        id: 'opportunity-id',
      },
    });
  });
});
