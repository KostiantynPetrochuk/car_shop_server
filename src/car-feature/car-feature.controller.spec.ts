import { Test, TestingModule } from '@nestjs/testing';
import { CarFeatureController } from './car-feature.controller';

describe('CarFeatureController', () => {
  let controller: CarFeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarFeatureController],
    }).compile();

    controller = module.get<CarFeatureController>(CarFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
