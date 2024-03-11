import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ProductAttributeService } from './product_attribute.service';
import { CreateProductAttributeBodyDTO, CreateProductAttributeDTO } from '@shared/dtos/product/product_attribute/create.dto';
import { JwtGuard } from '@auth/guards/jwt.guard';

@Controller('product-attribute')
export class ProductAttributeController {
  constructor(private readonly productAttributeService: ProductAttributeService) { }


  @UseGuards(JwtGuard)
  @Post(CreateProductAttributeDTO.url)
  create(@Body() body: CreateProductAttributeBodyDTO[]) {
    return this.productAttributeService.create(body)
  }
}
