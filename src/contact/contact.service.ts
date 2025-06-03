import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ContactService {
  constructor(
    private db: PrismaService,
    private userService: UserService,
  ) { }

  async create(userId: string, data: CreateContactDTO) {
    const user = await this.userService.getUserById(userId)

    const emailExists = Boolean(await this.db.contact.findUnique({
      where: {
        email: data.email,
      },
    }));
    if (emailExists) {
      throw new ConflictException('Email exists')
    }

    const phoneExists = Boolean(await this.db.contact.findUnique({
      where: {
        phone: data.phone,
      },
    }));
    if (phoneExists) {
      throw new ConflictException('Phone exists')
    }

    return await this.db.contact.create({
      data: {
        ...data,
        userId: user.id,
      },
    })
  }

  async find(userId: string, text: string) {
    return await this.db.contact.findMany({
      where: {
        userId,
        OR: [
          {
            name: { contains: text }
          },
          {
            email: { contains: text }
          },
          {
            phone: { contains: text }
          },
          {
            tag: { contains: text }
          },
        ],
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async update(userId: string, contactId: string, data: UpdateContactDTO) {
    const contact = await this.db.contact.findUnique({
      where: {
        userId,
        id: contactId,
      },
    });
    if (!contact) {
      throw new NotFoundException();
    }

    if (data.email) {
      const emailExists = Boolean(await this.db.contact.findUnique({
        where: {
          email: data.email,
          AND: {
            id: {
              not: contactId,
            },
          },
        },
      }));
      if (emailExists) {
        throw new ConflictException('Email exists')
      }
    }

    if (data.phone) {
      const phoneExists = Boolean(await this.db.contact.findUnique({
        where: {
          phone: data.phone,
          AND: {
            id: {
              not: contactId,
            },
          },
        },
      }));
      if (phoneExists) {
        throw new ConflictException('Phone exists')
      }
    }

    return await this.db.contact.update({
      where: { id: contactId },
      data,
    });
  }


  async delete(userId: string, contactId: string) {
    const contact = await this.db.contact.findUnique({
      where: {
        userId,
        id: contactId,
      },
    });
    if (!contact) {
      throw new NotFoundException();
    }

    await this.db.contact.delete({
      where: {
        id: contactId,
      },
    });
  }

  async listTags(userId: string) {
    const contacts = await this.db.contact.findMany({
      where: {
        userId,
      },
      select: {
        tag: true,
      },
      distinct: ['tag'],
      orderBy: {
        tag: 'asc',
      },
    })

    return contacts.map(contact => contact.tag)
  }

  async findByTag(userId: string, tag: string) {
    return await this.db.contact.findMany({
      where: {
        userId,
        tag,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}