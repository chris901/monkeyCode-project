import { IsOptional, IsString, IsMobilePhone, MinLength, MaxLength, IsArray, IsIn } from 'class-validator';

export class RegisterDto {
  @IsMobilePhone('zh-CN', {}, { message: '手机号格式不正确' })
  phone: string;

  @IsString()
  @MinLength(6, { message: '密码至少6位' })
  @MaxLength(20, { message: '密码最多20位' })
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  nickname?: string;
}

export class LoginDto {
  @IsMobilePhone('zh-CN', {}, { message: '手机号格式不正确' })
  phone: string;

  @IsString()
  password: string;
}

export class LoginByPhoneDto {
  @IsMobilePhone('zh-CN', {}, { message: '手机号格式不正确' })
  phone: string;

  @IsString()
  @MinLength(6, { message: '验证码为6位' })
  @MaxLength(6, { message: '验证码为6位' })
  code: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  nickname?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}

export class WechatLoginDto {
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  encryptedData?: string;

  @IsOptional()
  @IsString()
  iv?: string;
}
