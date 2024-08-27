import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Car } from './car.entity';
import { Feature } from '../feature/feature.entity';
import { CarFeature } from '../car-feature/car-feature.entity';
import { CreateCarDto } from './dto/createCar.dto';
import { Brand } from '../brand/brand.entity';
import { Model } from '../model/model.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
    @InjectRepository(CarFeature)
    private carFeatureRepository: Repository<CarFeature>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
  ) {}

  async createCarWithFeatures(carDto: CreateCarDto): Promise<Car> {
    const brand = await this.brandRepository.findOne({
      where: { id: carDto.brandId },
    });
    if (!brand) {
      throw new NotFoundException(`Brand with id ${carDto.brandId} not found`);
    }
    const model = await this.modelRepository.findOne({
      where: { id: carDto.modelId },
    });
    if (!model) {
      throw new NotFoundException(`Model with id ${carDto.modelId} not found`);
    }
    const car = this.carRepository.create({
      ...carDto,
      brand,
      model,
    });
    const savedCar = await this.carRepository.save(car);
    const features = await this.featureRepository.findBy({
      id: In(carDto.featureIds),
    });
    if (features.length !== carDto.featureIds.length) {
      throw new NotFoundException('One or more feature IDs are invalid');
    }
    const carFeatures = features.map((feature) => {
      const carFeature = new CarFeature();
      carFeature.car = savedCar;
      carFeature.feature = feature;
      return carFeature;
    });
    const savedCarFeatures = await this.carFeatureRepository.save(carFeatures);
    return { ...savedCar, carFeatures };
  }

  async getCarById(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ['brand', 'model', 'carFeatures', 'carFeatures.feature'],
    });
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }

  async getCars(): Promise<Car[]> {
    const cars = await this.carRepository.find({
      relations: ['brand', 'model', 'carFeatures', 'carFeatures.feature'],
    });
    if (!cars) {
      throw new NotFoundException(`Cars not found`);
    }
    return cars;
  }
}
