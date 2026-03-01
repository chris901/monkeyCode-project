import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { Public } from '../../common/decorators/public.decorator';
import { WechatLoginDto } from '../auth/dto/auth.dto';

@ApiTags('认证')
@Controller('auth')
export class WechatController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login/wechat')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '微信登录' })
  async loginByWechat(@Body() dto: WechatLoginDto) {
    return {
      message: '微信登录功能需要配置微信开放平台 AppID 和 AppSecret',
      code: dto.code,
    };
  }
}
