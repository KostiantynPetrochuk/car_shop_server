import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  UploadedFiles,
} from '@blazity/nest-file-fastify';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/createBrand.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard)
  // @HttpCode(HttpStatus.OK)
  // @Post()
  // createBrand(@Body() createBrandDto: CreateBrandDto) {
  //   console.log({ createBrandDto });

  //   // return this.brandService.createBrand(createBrandDto.brand_name);
  //   return { status: true };
  // }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'imageTwo', maxCount: 1 },
    ]),
  )
  async createBrand(
    @Body() data: Record<string, unknown>,
    @UploadedFiles()
    files,
  ): Promise<any> {
    console.log({ data });
    console.log({ files });
    console.log(files.image[0]);
    return { status: true };
  }
}
