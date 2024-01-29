import { EnvModule } from "@config/env/env.modules";
import { Module } from "@nestjs/common";
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import { EnvServiceConfig } from "@config/env/env-config.service";
import { join } from "path";

@Module({
    imports: [
        EnvModule,
        I18nModule.forRootAsync({
            imports: [EnvModule],
            useFactory: (configService: EnvServiceConfig) => ({
                fallbackLanguage: "en",
                loaderOptions: {
                    path: join("locales/"),
                    watch: true,
                },
            }),
            resolvers: [
                { use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver, new HeaderResolver(['x-lang']),
            ],
            inject: [EnvServiceConfig],
        }),
    ],
})
export class LocalesModule { }