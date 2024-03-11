
import { EnvServiceConfig } from '@config/env/env-config.service';
import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config"
export const StorageProvider = {
    provide: 'CLOUDINARY',
    useFactory: (config: EnvServiceConfig) => {
        return cloudinary.config({
            cloud_name: config.CLOUDINARY_CLOUD_NAME(),
            api_key: config.CLOUDINARY_API_KEY(),
            api_secret: config.CLOUDINARY_API_SECRET(),
            secure: true,
        });
    },
    inject: [EnvServiceConfig],
};
