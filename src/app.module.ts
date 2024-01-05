import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { INTERCEPTORS_METADATA } from '@nestjs/common/constants';
import { SerializeInterceptor } from '@shared/interceptors/serialize.interceptor';
import { EnvModule } from '@config/env/env.modules';
import { UserModule } from './models/user/user.module';
import { RoleModule } from './models/role/role.module';
import { UserRoleModule } from './models/user_role/user_role.module';
import { ProductModule } from './models/product/product.module';
import { BrandModule } from './models/brand/brand.module';
import { ManufacturerModule } from './models/manufacturer/manufacturer.module';
import { ProductItemModule } from './models/product_item/product_item.module';
import { ProductAttributeModule } from './models/product_attribute/product_attribute.module';
import { ProductInventoryModule } from './models/product_inventory/product_inventory.module';
import { DatabaseModule } from '@config/database/database.module';
import { AuthenticationModule } from './auth/authentication/authentication.module';
import { PassportModule } from '@nestjs/passport';
import * as cookieParser from 'cookie-parser';
@Module({
  imports: [
    EnvModule,
    DatabaseModule,
    AuthenticationModule,
    UserModule,
    RoleModule,
    UserRoleModule,
    ProductModule,
    BrandModule,
    ManufacturerModule,
    ProductItemModule,
    ProductAttributeModule,
    ProductInventoryModule,
    PassportModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: INTERCEPTORS_METADATA,
      useClass: SerializeInterceptor
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
    // ... other middleware
  }
}