import { Module } from '@nestjs/common';
import { ProductAttributeService } from './product_attribute.service';
import { ProductAttributeController } from './product_attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttribute } from './entities/product_attribute.entity';
import { ProductInventory } from '../product_inventory/entities/product_inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductAttribute, ProductInventory])
  ],
  controllers: [ProductAttributeController],
  providers: [ProductAttributeService],
})
export class ProductAttributeModule { }
