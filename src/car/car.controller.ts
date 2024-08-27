import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { CarService } from './car.service';

import { CreateCarDto } from './dto/createCar.dto';
import { Car } from './car.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { diskStorage } from 'multer';

import { promisify } from 'util';
import { exec } from 'child_process';
import { extname, basename } from 'path';
import { unlink } from 'fs/promises';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const execPromise = promisify(exec);

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

  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/cars',
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async uploadFile(
    @Body() body: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const webpFiles: string[] = [];
    await Promise.all(
      files.map(async (file) => {
        const inputPath = file.path;
        const outputPath = `${file.destination}/${basename(file.filename, extname(file.filename))}.webp`;
        if (extname(file.originalname).toLowerCase() === '.webp') {
          webpFiles.push(file.filename);
        } else {
          try {
            await execPromise(`convert "${inputPath}" "${outputPath}"`);
            webpFiles.push(
              `${basename(file.filename, extname(file.filename))}.webp`,
            );
            await unlink(inputPath);
          } catch (error) {
            console.error(`Помилка при конвертації ${inputPath}:`, error);
          }
        }
      }),
    );
    const createCarDto = plainToInstance(CreateCarDto, {
      ...body,
      featureIds: JSON.parse(body.featureIds).map((value: string) =>
        Number(value),
      ),
      imageNames: webpFiles,
    });
    const errors = await validate(createCarDto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
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
