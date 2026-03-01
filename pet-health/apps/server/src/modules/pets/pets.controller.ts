import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { PetsService } from './pets.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreatePetDto, UpdatePetDto } from './dto/pet.dto';

@ApiTags('宠物')
@Controller('pets')
@ApiBearerAuth()
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Get()
  @ApiOperation({ summary: '获取宠物列表' })
  findAll(@CurrentUser('sub') userId: string) {
    return this.petsService.findAll(userId);
  }

  @Post()
  @ApiOperation({ summary: '创建宠物档案' })
  create(@CurrentUser('sub') userId: string, @Body() dto: CreatePetDto) {
    return this.petsService.create(userId, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取宠物详情' })
  findOne(@CurrentUser('sub') userId: string, @Param('id') id: string) {
    return this.petsService.findOne(userId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新宠物信息' })
  update(
    @CurrentUser('sub') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdatePetDto,
  ) {
    return this.petsService.update(userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除宠物档案' })
  remove(@CurrentUser('sub') userId: string, @Param('id') id: string) {
    return this.petsService.remove(userId, id);
  }

  @Post(':id/avatar')
  @ApiOperation({ summary: '上传宠物头像' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @CurrentUser('sub') userId: string,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const avatarUrl = `/uploads/${file.filename}`;
    await this.petsService.update(userId, id, { avatar: avatarUrl });
    return { avatar: avatarUrl };
  }
}
