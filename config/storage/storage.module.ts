import { Module } from "@nestjs/common";
import { StorageService } from "./stograge.service";
import { StorageProvider } from "./storage.provider";
import { EnvModule } from "@config/env/env.modules";
import { StorageController } from "./stograge.controller";

@Module({
    imports: [
        EnvModule
    ],
    controllers: [
        StorageController
    ],
    providers: [StorageService, StorageProvider],
    exports: [StorageService],
})
export class StorageModule {

}