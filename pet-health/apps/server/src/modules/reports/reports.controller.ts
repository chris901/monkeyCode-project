import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PetsService } from '../pets/pets.service';

@ApiTags('健康周报')
@Controller('pets/:petId/reports')
@ApiBearerAuth()
export class ReportsController {
  constructor(
    private reportsService: ReportsService,
    private petsService: PetsService,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取周报列表' })
  async findAll(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.reportsService.findAll(petId);
  }

  @Get('latest')
  @ApiOperation({ summary: '获取最新周报' })
  async findLatest(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.reportsService.findLatest(petId);
  }

  @Post('generate')
  @ApiOperation({ summary: '手动生成周报' })
  async generate(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.reportsService.generate(petId);
  }
}
