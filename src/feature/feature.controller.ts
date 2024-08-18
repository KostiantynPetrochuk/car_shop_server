import { Controller, Get, Post, Body } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/createFeature.dto';
import { Feature } from './feature.entity';

@Controller('features')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Post()
  async createFeature(@Body() featureData: CreateFeatureDto): Promise<Feature> {
    return this.featureService.createFeature(featureData);
  }

  @Get()
  async getFeatures(): Promise<Feature[]> {
    return this.featureService.getFeatures();
  }
}
