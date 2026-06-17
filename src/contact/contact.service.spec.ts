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
  };

  beforeEach(async () => {
    prisma = {
      contact: {
        findFirst: jest.fn(),
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
});
