import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOpportunityDTO, UpdateOpportunityDTO } from './opportunity.dto';

@Injectable()
export class OpportunityService {
  constructor(private db: PrismaService) {}

  async create(userId: string, data: CreateOpportunityDTO) {
    const contact = await this.findContact(userId, data.contactId);

    return await this.db.salesOpportunity.create({
      data: {
        title: data.title,
        description: data.description,
        pipelineStage: data.pipelineStage,
        estimatedValue: data.estimatedValue,
        status: data.status,
        contactId: contact.id,
      },
    });
  }

  async find(userId: string) {
    return await this.db.salesOpportunity.findMany({
      where: {
        contact: {
          userId,
        },
      },
      include: {
        contact: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(userId: string, opportunityId: string) {
    const opportunity = await this.db.salesOpportunity.findFirst({
      where: {
        id: opportunityId,
        contact: {
          userId,
        },
      },
      include: {
        contact: true,
      },
    });

    if (!opportunity) {
      throw new NotFoundException();
    }

    return opportunity;
  }

  async update(userId: string, opportunityId: string, data: UpdateOpportunityDTO) {
    await this.findById(userId, opportunityId);

    if (data.contactId) {
      await this.findContact(userId, data.contactId);
    }

    return await this.db.salesOpportunity.update({
      where: {
        id: opportunityId,
      },
      data,
    });
  }

  async delete(userId: string, opportunityId: string) {
    const opportunity = await this.findById(userId, opportunityId);

    await this.db.salesOpportunity.delete({
      where: {
        id: opportunity.id,
      },
    });
  }

  private async findContact(userId: string, contactId: string) {
    const contact = await this.db.contact.findFirst({
      where: {
        id: contactId,
        userId,
      },
    });

    if (!contact) {
      throw new NotFoundException();
    }

    return contact;
  }
}
