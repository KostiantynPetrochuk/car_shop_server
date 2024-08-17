import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/createBrand.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Змінено з 'image' на 'file'
  uploadFile(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(createBrandDto);
    console.log(file);
    return { status: true };
  }
}
