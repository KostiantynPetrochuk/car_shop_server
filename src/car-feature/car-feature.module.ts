import { Module } from '@nestjs/common';
import { CarFeatureService } from './car-feature.service';

@Module({
  providers: [CarFeatureService],
})
export class CarFeatureModule {}
