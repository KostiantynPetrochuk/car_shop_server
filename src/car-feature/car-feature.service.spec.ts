import { Test, TestingModule } from '@nestjs/testing';
import { CarFeatureService } from './car-feature.service';

describe('CarFeatureService', () => {
  let service: CarFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarFeatureService],
    }).compile();

    service = module.get<CarFeatureService>(CarFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
