import { Injectable } from '@nestjs/common';

@Injectable()
export class BrandService {
  createBrand(brandName: string) {
    return brandName;
  }
}
