import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  @IsNotEmpty()
  feature_name: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
