import { Controller, Post, Body } from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/createModel.dto';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  async createModel(@Body() createModelDto: CreateModelDto) {
    return this.modelService.createModel(
      createModelDto.brandId,
      createModelDto.modelName,
    );
  }
}
