import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DietService } from './diet.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateDietDto, UpdateDietDto, QueryDietDto } from './dto/diet.dto';
import { PetsService } from '../pets/pets.service';

@ApiTags('饮食记录')
@Controller('pets/:petId/diet')
@ApiBearerAuth()
export class DietController {
  constructor(
    private dietService: DietService,
    private petsService: PetsService,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取饮食记录列表' })
  async findAll(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
    @Query() query: QueryDietDto,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.dietService.findAll(petId, query);
  }

  @Post()
  @ApiOperation({ summary: '添加饮食记录' })
  async create(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
    @Body() dto: CreateDietDto,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.dietService.create(petId, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新饮食记录' })
  async update(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
    @Param('id') id: string,
    @Body() dto: UpdateDietDto,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.dietService.update(petId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除饮食记录' })
  async remove(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
    @Param('id') id: string,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.dietService.remove(petId, id);
  }
}
