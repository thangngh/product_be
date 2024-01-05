import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Manufacturer } from '../manufacturer/entities/manufacturer.entity';
import { Brand } from '../brand/entities/brand.entity';
import { User } from '../user/entities/user.entity';
import { ProductItem } from '../product_item/entities/product_item.entity';
import { ProductInventory } from '../product_inventory/entities/product_inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductInventory,
      Product,
      Manufacturer,
      Brand,
      User,
      ProductItem
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
