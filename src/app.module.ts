import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { LocalesModule } from '@config/locales/locales.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { I18nInterceptor, SerializeInterceptor } from '@shared/interceptors';
import { StorageModule } from '@config/storage/storage.module';
@Module({
  imports: [
    EnvModule,
    LocalesModule,
    StorageModule,
    DatabaseModule,
    AuthModule,
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
      provide: APP_INTERCEPTOR,
      useClass: SerializeInterceptor
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: I18nInterceptor
    // }
  ],
})
export class AppModule {

}