import { Controller, Get, Render } from '@nestjs/common';

@Controller('car')
export class CarsController {
  @Get()
  @Render('car.hbs')
  root() {
    console.log('/car');
    return {
      message: 'Hello world!',
      items: [
        { name: 'Item 1', value: 'Value 1' },
        { name: 'Item 2', value: 'Value 2' },
        { name: 'Item 3', value: 'Value 3' },
      ],
    };
  }
}
