import { Controller } from '@nestjs/common';
import { ProductAttributeService } from './product_attribute.service';

@Controller('product-attribute')
export class ProductAttributeController {
  constructor(private readonly productAttributeService: ProductAttributeService) {}
}
