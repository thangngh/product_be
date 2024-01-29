import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductBodyDTO, CreateProductDTO } from '@shared/dtos/product/create.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { authUser } from '@shared/decorators/auth.decorator';
import { User } from '../user/entities/user.entity';
import { CreateProductItemBodyDTO } from '@shared/dtos/product/product_item/create.dto';
import { CreateProductInventoryBodyDTO, CreateProductInventoryWithAttributeBodyDTO } from '@shared/dtos/product/product_inventory/create.dto';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from '@shared/pipes/sharp.pipe';

@ApiTags("product")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @UseGuards(JwtGuard)
  @Post(CreateProductDTO.url)
  // @UseInterceptors(FilesInterceptor("image"))
  @UseInterceptors(SharpPipe)
  @ApiBearerAuth()
  create(
    @authUser() user: User,
    // @UploadedFiles() file: Array<Express.Multer.File>,
    @UploadedFiles() file: {
      bodyProductItem?: Express.Multer.File;
      bodyProductInventory?: Express.Multer.File;
    },
    @Body() productBody: CreateProductBodyDTO,
    @Body("bodyProductItem") productItemBody: CreateProductItemBodyDTO[], // have image
    @Body("bodyProductInventory") productInventoryBody:
      CreateProductInventoryWithAttributeBodyDTO[], //have image
  ) {
    console.log("file controller", file)
    console.log("productInventoryBody", productInventoryBody)
    // return this.productService.create(
    //   user,
    //   productBody,
    //   productItemBody,
    //   productInventoryBody)
  }
}
