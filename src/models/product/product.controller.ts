import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors, Request, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductBodyDTO, CreateProductDTO } from '@shared/dtos/product/create.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { authUser } from '@shared/decorators/auth.decorator';
import { User } from '../user/entities/user.entity';
import { CreateProductItemBodyDTO } from '@shared/dtos/product/product_item/create.dto';
import { CreateProductInventoryBodyDTO, CreateProductInventoryWithAttributeBodyDTO } from '@shared/dtos/product/product_inventory/create.dto';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from '@shared/pipes/sharp.pipe';
import { GetAllProductDTO, GetAllProductResponse } from '@shared/dtos/product/get.dto';
import { PaginationDTO } from '@shared/pagination/dto/paginationQuery-dto';
import { SerializeInterceptor } from '@shared/interceptors';
import { Product } from './entities/product.entity';
import { Pagination } from '@shared/pagination';

@ApiTags("product")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post(CreateProductDTO.url)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'bodyProductItem', maxCount: 2 },
    { name: 'bodyProductInventory', maxCount: 2 },
  ], {}))
  create(
    @authUser() user: User,
    @UploadedFiles(SharpPipe) files: {
      bodyProductItem?: Record<string, Array<Express.Multer.File>>;
      bodyProductInventory?: Record<string, Array<Express.Multer.File>>;
    },
    @Body() body: {
      productBody: CreateProductBodyDTO,
      bodyProductItem: CreateProductItemBodyDTO[],
      bodyProductInventory: CreateProductInventoryWithAttributeBodyDTO[],
    },
  ) {
    return this.productService.create(
      user,
      body,
      files
    )
  }


  // @UseInterceptors(SerializeInterceptor<Pagination<Product>>)
  @Get(GetAllProductDTO.url)
  getAllProduct(@Query() query: PaginationDTO) {
    return this.productService.getAllProduct(query)
  }
}
