import { Controller, Get, Post, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { EmotionService } from './emotion.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PetsService } from '../pets/pets.service';

@ApiTags('情绪识别')
@Controller('pets/:petId/emotion')
@ApiBearerAuth()
export class EmotionController {
  constructor(
    private emotionService: EmotionService,
    private petsService: PetsService,
  ) {}

  @Post('analyze')
  @ApiOperation({ summary: '上传照片分析情绪' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async analyze(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.petsService.findOne(userId, petId);
    const photoUrl = `/uploads/${file?.filename || 'mock.jpg'}`;
    return this.emotionService.analyze(petId, photoUrl);
  }

  @Get('history')
  @ApiOperation({ summary: '获取识别历史' })
  async getHistory(
    @CurrentUser('sub') userId: string,
    @Param('petId') petId: string,
  ) {
    await this.petsService.findOne(userId, petId);
    return this.emotionService.getHistory(petId);
  }
}
