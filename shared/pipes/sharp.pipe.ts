import { Injectable, PipeTransform, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp'
import { AllowedMimeTypes } from '@shared/constant';
import { StorageService } from '@config/storage/stograge.service';
@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File, Promise<string>> {

    constructor(
        private readonly storageService: StorageService
    ) { }

    private readonly maxSize = 1024 * 1024 * 2  //2MB;
    private readonly allowedMimeTypes = Object.values(AllowedMimeTypes);

    async transform(file: Express.Multer.File): Promise<any> {

        const fileData: Express.Multer.File[] = Object.values(file).flat();
        const processedFiles: any[] = [];

        for (const fl of fileData) {

            if (this.maxSize < fl.size) {
                throw new BadRequestException('File is too large');
            }

            if (!this.allowedMimeTypes.includes(fl.mimetype as AllowedMimeTypes)) {
                throw new BadRequestException('Invalid file type');
            }

            const originalName = path.parse(fl.originalname).name;
            const ext = fl.mimetype.startsWith("image/") ? ".webp" : ".webm"
            const filename = Date.now() + '-' + originalName + ext

            if (fl.mimetype.startsWith('image/')) {

                const imageBuffer = await sharp(fl.buffer)
                    .resize(400)
                    .webp({ effort: 3 })
                    .toBuffer();

                const base64String = imageBuffer.toString('base64');

                const uploadCloudinary = await this.storageService.uploadFileFromBase64(`data:image/jpeg;base64,${base64String}`, "product")
                processedFiles.push({
                    filename,
                    id: uploadCloudinary.public_id,
                    type: uploadCloudinary.resource_type,
                    url: uploadCloudinary.url,
                    fieldName: fl.fieldname,
                });

            }
            // if (fl.mimetype.startsWith('video/')) {
            // }
        }

        return processedFiles;
    }
}