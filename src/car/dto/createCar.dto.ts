import { IsNumber, IsString, IsArray } from 'class-validator';

export class CreateCarDto {
  @IsString()
  vin: string;

  @IsNumber()
  brandId: number;

  @IsNumber()
  modelId: number;

  @IsString()
  body: string;

  @IsNumber()
  mileage: number;

  @IsString()
  fuel_type: string;

  @IsNumber()
  year: number;

  @IsString()
  transmission: string;

  @IsString()
  drive_type: string;

  @IsString()
  condition: string;

  @IsNumber()
  engine_size: number;

  @IsNumber()
  door_count: number;

  @IsNumber()
  cylinder_count: number;

  @IsString()
  color: string;

  @IsArray()
  @IsNumber({}, { each: true })
  featureIds: number[];
}
