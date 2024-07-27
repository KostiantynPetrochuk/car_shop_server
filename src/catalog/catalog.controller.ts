import { Controller, Get, Render } from '@nestjs/common';

@Controller('catalog')
export class CatalogController {
  @Get()
  @Render('catalog.hbs')
  root() {
    console.log('/catalog');
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
