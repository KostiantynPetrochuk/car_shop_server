import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CarService } from './car.service';

import { CreateCarDto } from './dto/createCar.dto';
import { Car } from './car.entity';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async getCars(): Promise<Car[]> {
    const cars = await this.carService.getCars();
    if (!cars) {
      throw new NotFoundException(`Cars not found`);
    }
    return cars;
  }

  @Post()
  async createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.createCarWithFeatures(createCarDto);
  }

  @Get(':id')
  async getCar(@Param('id') id: number): Promise<Car> {
    const car = await this.carService.getCarById(id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }
}
