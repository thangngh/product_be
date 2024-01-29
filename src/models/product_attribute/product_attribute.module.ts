import { Module } from '@nestjs/common';
import { ProductAttributeService } from './product_attribute.service';
import { ProductAttributeController } from './product_attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttribute } from './entities/product_attribute.entity';
import { ProductInventory } from '../product_inventory/entities/product_inventory.entity';
import { ProductAttributeRepository } from './product_attribute.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductAttribute, ProductInventory])
  ],
  controllers: [ProductAttributeController],
  providers: [ProductAttributeService, ProductAttributeRepository],
  exports: [ProductAttributeService]
})
export class ProductAttributeModule { }
