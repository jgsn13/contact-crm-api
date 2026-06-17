import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserId } from 'src/user/user-id.decorator';
import { CreateOpportunityDTO, UpdateOpportunityDTO } from './opportunity.dto';
import { OpportunityService } from './opportunity.service';

@Controller('opportunities')
export class OpportunityController {
  constructor(private opportunityService: OpportunityService) {}

  @Post()
  async create(
    @UserId() userId: string,
    @Body() body: CreateOpportunityDTO,
  ) {
    return await this.opportunityService.create(userId, body);
  }

  @Get()
  async find(@UserId() userId: string) {
    return await this.opportunityService.find(userId);
  }

  @Get(':opportunityId')
  async findById(
    @UserId() userId: string,
    @Param('opportunityId') opportunityId: string,
  ) {
    return await this.opportunityService.findById(userId, opportunityId);
  }

  @Put(':opportunityId')
  async update(
    @UserId() userId: string,
    @Param('opportunityId') opportunityId: string,
    @Body() body: UpdateOpportunityDTO,
  ) {
    return await this.opportunityService.update(userId, opportunityId, body);
  }

  @Delete(':opportunityId')
  async delete(
    @UserId() userId: string,
    @Param('opportunityId') opportunityId: string,
  ) {
    return await this.opportunityService.delete(userId, opportunityId);
  }
}
