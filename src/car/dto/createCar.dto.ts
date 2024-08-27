import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsArray } from 'class-validator';

export class CreateCarDto {
  @IsString()
  vin: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  brandId: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  modelId: number;

  @IsString()
  body: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  mileage: number;

  @IsString()
  fuel_type: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  year: number;

  @IsString()
  transmission: string;

  @IsString()
  drive_type: string;

  @IsString()
  condition: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  engine_size: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  door_count: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  cylinder_count: number;

  @IsString()
  color: string;

  @IsArray()
  @IsNumber({}, { each: true })
  featureIds: number[];

  @IsArray()
  @IsString({ each: true })
  imageNames: string[];
}
