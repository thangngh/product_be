import { Module } from "@nestjs/common";
import { StorageService } from "./stograge.service";
import { StorageProvider } from "./storage.provider";
import { EnvModule } from "@config/env/env.modules";

@Module({
    imports: [
        EnvModule
    ],
    providers: [StorageService, StorageProvider],
    exports: [StorageService, StorageProvider],
})
export class StorageModule {

}