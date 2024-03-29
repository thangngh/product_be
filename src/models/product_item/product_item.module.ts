import { Module } from '@nestjs/common';
import { ProductItemService } from './product_item.service';
import { ProductItemController } from './product_item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductItem } from './entities/product_item.entity';
import { Product } from '../product/entities/product.entity';
import { ProductItemRepository } from './product_item.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductItem, Product])
  ],
  controllers: [ProductItemController],
  providers: [ProductItemService, ProductItemRepository],
  exports: [ProductItemService, ProductItemRepository]
})
export class ProductItemModule { }
