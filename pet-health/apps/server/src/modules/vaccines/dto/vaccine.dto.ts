import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class CreateVaccineDto {
  @IsString()
  @IsNotEmpty()
  vaccineName: string;

  @IsEnum(['rabies', 'combined', 'other'])
  type: string;

  @IsDateString()
  inoculationDate: string;

  @IsOptional()
  @IsDateString()
  nextDate?: string;

  @IsOptional()
  @IsString()
  hospital?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  notes?: string;
}

export class UpdateVaccineDto {
  @IsOptional()
  @IsString()
  vaccineName?: string;

  @IsOptional()
  @IsEnum(['rabies', 'combined', 'other'])
  type?: string;

  @IsOptional()
  @IsDateString()
  inoculationDate?: string;

  @IsOptional()
  @IsDateString()
  nextDate?: string;

  @IsOptional()
  @IsString()
  hospital?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  notes?: string;
}
