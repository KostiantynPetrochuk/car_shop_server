import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get()
  @Render('index.hbs')
  root() {
    console.log('/home');
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
