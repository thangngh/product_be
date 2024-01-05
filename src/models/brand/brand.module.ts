import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Product } from '../product/entities/product.entity';
import { BrandRepository } from './brand.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand, Product])
  ],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
})
export class BrandModule { }
