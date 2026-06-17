import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';
import { UserId } from 'src/user/user-id.decorator';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) { }

  @Post()
  async create(
    @UserId() userId: string,
    @Body() body: CreateContactDTO,
  ) {
    return await this.contactService.create(userId, body);
  }

  @Get('list')
  async find(
    @UserId() userId: string,
    @Query('text') text: string = '',
  ) {
    return await this.contactService.find(userId, text);
  }

  @Get('list/:tag')
  async findByTag(
    @UserId() userId: string,
    @Param('tag') tag: string,
  ) {
    return await this.contactService.findByTag(userId, tag);
  }

  @Put(':contactId')
  async update(
    @UserId() userId: string,
    @Param('contactId') contactId: string,
    @Body() body: UpdateContactDTO,
  ) {
    return await this.contactService.update(userId, contactId, body);
  }

  @Delete(':contactId')
  async delete(
    @UserId() userId: string,
    @Param('contactId') contactId: string,
  ) {
    return await this.contactService.delete(userId, contactId);
  }

  @Get('tags')
  async listTags(
    @UserId() userId: string,
  ) {
    return await this.contactService.listTags(userId);
  }

  @Get(':contactId')
  async findById(
    @UserId() userId: string,
    @Param('contactId') contactId: string,
  ) {
    return await this.contactService.findById(userId, contactId);
  }
}
