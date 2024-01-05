import { Controller } from '@nestjs/common';
import { ProductInventoryService } from './product_inventory.service';

@Controller('product-inventory')
export class ProductInventoryController {
  constructor(private readonly productInventoryService: ProductInventoryService) {}
}
