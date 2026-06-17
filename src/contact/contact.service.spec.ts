import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { NotFoundException } from '@nestjs/common';

describe('ContactService', () => {
  let service: ContactService;
  let prisma: {
    contact: {
      findFirst: jest.Mock;
    };
    contactInteraction: {
      create: jest.Mock;
      findMany: jest.Mock;
      findFirst: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      contact: {
        findFirst: jest.fn(),
      },
      contactInteraction: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a contact by id and user id', async () => {
    const contact = {
      id: 'contact-id',
      userId: 'user-id',
      name: 'Maria',
      email: 'maria@email.com',
      phone: '88999999999',
      company: 'Acme',
      status: 'active',
      tag: 'client',
    };
    prisma.contact.findFirst.mockResolvedValue(contact);

    await expect(service.findById('user-id', 'contact-id')).resolves.toEqual(contact);
    expect(prisma.contact.findFirst).toHaveBeenCalledWith({
      where: {
        userId: 'user-id',
        id: 'contact-id',
      },
    });
  });

  it('should throw when contact is not found by id', async () => {
    prisma.contact.findFirst.mockResolvedValue(null);

    await expect(service.findById('user-id', 'missing-id')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should create an interaction for a contact owned by the user', async () => {
    prisma.contact.findFirst.mockResolvedValue({
      id: 'contact-id',
      userId: 'user-id',
    });
    prisma.contactInteraction.create.mockResolvedValue({
      id: 'interaction-id',
      contactId: 'contact-id',
      type: 'email',
      description: 'Sent proposal',
    });

    await expect(service.createInteraction('user-id', 'contact-id', {
      type: 'email',
      description: 'Sent proposal',
    })).resolves.toEqual({
      id: 'interaction-id',
      contactId: 'contact-id',
      type: 'email',
      description: 'Sent proposal',
    });
    expect(prisma.contactInteraction.create).toHaveBeenCalledWith({
      data: {
        type: 'email',
        description: 'Sent proposal',
        occurredAt: undefined,
        contactId: 'contact-id',
      },
    });
  });

  it('should list interactions for a contact owned by the user', async () => {
    const interactions = [
      {
        id: 'interaction-id',
        contactId: 'contact-id',
        type: 'call',
        description: 'Called customer',
      },
    ];
    prisma.contact.findFirst.mockResolvedValue({
      id: 'contact-id',
      userId: 'user-id',
    });
    prisma.contactInteraction.findMany.mockResolvedValue(interactions);

    await expect(service.listInteractions('user-id', 'contact-id')).resolves.toEqual(interactions);
    expect(prisma.contactInteraction.findMany).toHaveBeenCalledWith({
      where: {
        contactId: 'contact-id',
      },
      orderBy: {
        occurredAt: 'desc',
      },
    });
  });

  it('should delete an interaction owned by the user', async () => {
    prisma.contactInteraction.findFirst.mockResolvedValue({
      id: 'interaction-id',
    });
    prisma.contactInteraction.delete.mockResolvedValue({
      id: 'interaction-id',
    });

    await expect(service.deleteInteraction('user-id', 'interaction-id')).resolves.toBeUndefined();
    expect(prisma.contactInteraction.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'interaction-id',
        contact: {
          userId: 'user-id',
        },
      },
    });
    expect(prisma.contactInteraction.delete).toHaveBeenCalledWith({
      where: {
        id: 'interaction-id',
      },
    });
  });
});
