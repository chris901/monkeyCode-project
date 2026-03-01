import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class CreateDietDto {
  @IsDateString()
  date: string;

  @IsEnum(['breakfast', 'lunch', 'dinner', 'snack'])
  mealType: string;

  @IsString()
  @IsNotEmpty()
  foodType: string;

  @IsNumber()
  amount: number;

  @IsEnum(['g', 'cup', 'can'])
  unit: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  notes?: string;
}

export class UpdateDietDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsEnum(['breakfast', 'lunch', 'dinner', 'snack'])
  mealType?: string;

  @IsOptional()
  @IsString()
  foodType?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsEnum(['g', 'cup', 'can'])
  unit?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  notes?: string;
}

export class QueryDietDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
