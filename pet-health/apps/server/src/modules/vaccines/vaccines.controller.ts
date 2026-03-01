import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VaccinesService } from './vaccines.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateVaccineDto, UpdateVaccineDto } from './dto/vaccine.dto';
import { PetsService } from '../pets/pets.service';

@ApiTags('疫苗记录')
@Controller('pets/:petId/vaccines')
@ApiBearerAuth()
export class VaccinesController {
  constructor(
    private vaccinesService: VaccinesService,
    private petsService: PetsService,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取疫苗记录列表' })
  async findAll(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.vaccinesService.findAll(petId);
  }

  @Get('alerts')
  @ApiOperation({ summary: '获取疫苗到期提醒' })
  async getAlerts(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.vaccinesService.getAlerts(petId);
  }

  @Post()
  @ApiOperation({ summary: '添加疫苗记录' })
  async create(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
    @Body() dto: CreateVaccineDto,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.vaccinesService.create(petId, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新疫苗记录' })
  async update(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
    @Param('id') id: string,
    @Body() dto: UpdateVaccineDto,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.vaccinesService.update(petId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除疫苗记录' })
  async remove(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
    @Param('id') id: string,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.vaccinesService.remove(petId, id);
  }
}
