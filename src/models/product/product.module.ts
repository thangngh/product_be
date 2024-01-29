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
import { ProductInventoryModule } from '../product_inventory/product_inventory.module';
import { ProductAttributeModule } from '../product_attribute/product_attribute.module';
import { ProductItemModule } from '../product_item/product_item.module';
import { ProductRepository } from './product.repository';
import { StorageModule } from '@config/storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductInventory,
      Product,
      Manufacturer,
      Brand,
      User,
      ProductItem
    ]),
    ProductInventoryModule,
    ProductAttributeModule,
    ProductItemModule,
    StorageModule
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService]
})
export class ProductModule { }
