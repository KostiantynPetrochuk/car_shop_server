import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './feature.entity';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
  ) {}

  async createFeature(featureData: {
    feature_name: string;
    category: string;
  }): Promise<Feature> {
    const newFeature = this.featureRepository.create(featureData);
    return await this.featureRepository.save(newFeature);
  }

  async getFeatures(): Promise<Feature[]> {
    return await this.featureRepository.find();
  }
}
