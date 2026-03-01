import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repositories/user.repository';
import { RegisterDto, LoginDto, LoginByPhoneDto, UpdateProfileDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepository.findByPhone(dto.phone);
    if (existingUser) {
      throw new ConflictException('该手机号已注册');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepository.create({
      phone: dto.phone,
      password: hashedPassword,
      nickname: dto.nickname || `用户${dto.phone.slice(-4)}`,
      loginType: ['phone'],
    });

    const token = this.generateToken(user._id.toString(), user.phone);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findByPhone(dto.phone);
    if (!user) {
      throw new UnauthorizedException('手机号或密码错误');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('手机号或密码错误');
    }

    const token = this.generateToken(user._id.toString(), user.phone);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  async loginByPhone(dto: LoginByPhoneDto) {
    const cachedCode = await this.cacheManager.get<string>(`sms:${dto.phone}`);
    if (!cachedCode || cachedCode !== dto.code) {
      throw new UnauthorizedException('验证码错误或已过期');
    }

    let user = await this.userRepository.findByPhone(dto.phone);
    if (!user) {
      user = await this.userRepository.create({
        phone: dto.phone,
        nickname: `用户${dto.phone.slice(-4)}`,
        loginType: ['phone'],
      });
    }

    await this.cacheManager.del(`sms:${dto.phone}`);

    const token = this.generateToken(user._id.toString(), user.phone);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  async sendSmsCode(phone: string) {
    const code = Math.random().toString().slice(-6);
    await this.cacheManager.set(`sms:${phone}`, code, 300);
    
    console.log(`[SMS] 发送验证码到 ${phone}: ${code}`);
    
    return { message: '验证码已发送' };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    return this.sanitizeUser(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.userRepository.updateById(userId, dto);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    return this.sanitizeUser(user);
  }

  async validateUser(userId: string) {
    return this.userRepository.findById(userId);
  }

  private generateToken(userId: string, phone: string): string {
    const payload = { sub: userId, phone };
    return this.jwtService.sign(payload);
  }

  private sanitizeUser(user: any) {
    const { password, ...result } = user.toObject ? user.toObject() : user;
    return result;
  }
}
