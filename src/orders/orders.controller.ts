import { Controller, Get, Render } from '@nestjs/common';

@Controller('order')
export class OrdersController {
  @Get()
  @Render('order.hbs')
  root() {
    console.log('/order');
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
