import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WalksService } from './walks.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateWalkDto, UpdateWalkDto } from './dto/walk.dto';
import { PetsService } from '../pets/pets.service';

@ApiTags('遛弯记录')
@Controller('pets/:petId/walks')
@ApiBearerAuth()
export class WalksController {
  constructor(
    private walksService: WalksService,
    private petsService: PetsService,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取遛弯记录列表' })
  async findAll(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.walksService.findAll(petId);
  }

  @Post()
  @ApiOperation({ summary: '添加遛弯记录' })
  async create(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
    @Body() dto: CreateWalkDto,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.walksService.create(petId, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新遛弯记录' })
  async update(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
    @Param('id') id: string,
    @Body() dto: UpdateWalkDto,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.walksService.update(petId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除遛弯记录' })
  async remove(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
    @Param('id') id: string,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.walksService.remove(petId, id);
  }
}
