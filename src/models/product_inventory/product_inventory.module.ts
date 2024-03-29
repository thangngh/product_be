import { Module } from '@nestjs/common';
import { ProductInventoryService } from './product_inventory.service';
import { ProductInventoryController } from './product_inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInventory } from './entities/product_inventory.entity';
import { Product } from '../product/entities/product.entity';
import { ProductAttribute } from '../product_attribute/entities/product_attribute.entity';
import { ProductInventoryRepository } from './product_inventory.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductInventory, Product, ProductAttribute])
  ],
  controllers: [ProductInventoryController],
  providers: [ProductInventoryService, ProductInventoryRepository],
  exports: [ProductInventoryService, ProductInventoryRepository]
})
export class ProductInventoryModule { }
