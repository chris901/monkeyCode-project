import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional, IsDateString, IsArray, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class TrackPointDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsDateString()
  timestamp: string;
}

export class CreateWalkDto {
  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsNumber()
  @Min(0)
  duration: number;

  @IsNumber()
  @Min(0)
  distance: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TrackPointDto)
  trackPoints: TrackPointDto[];

  @IsBoolean()
  manual: boolean;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateWalkDto {
  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  distance?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UploadTrackDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TrackPointDto)
  trackPoints: TrackPointDto[];
}
