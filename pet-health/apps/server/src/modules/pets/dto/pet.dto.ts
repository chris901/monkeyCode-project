import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber, IsDateString, MaxLength } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty({ message: '宠物名称不能为空' })
  @MaxLength(20)
  name: string;

  @IsEnum(['dog', 'cat', 'other'], { message: '宠物类型只能是 dog、cat 或 other' })
  type: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  breed?: string;

  @IsOptional()
  @IsEnum(['male', 'female'])
  gender?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  chipId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  notes?: string;
}

export class UpdatePetDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  name?: string;

  @IsOptional()
  @IsEnum(['dog', 'cat', 'other'])
  type?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  breed?: string;

  @IsOptional()
  @IsEnum(['male', 'female'])
  gender?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  chipId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  notes?: string;
}
