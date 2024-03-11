import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
// const streamifier = require('streamifier');

@Injectable()
export class StorageService {

    async uploadFile(
        file: Express.Multer.File,
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            ).end(file.buffer)
        })
    }

    async uploadFiles(
        files: Express.Multer.File[],
    ) {
        const urls = await Promise.all(files.map(async (file): Promise<string> => {
            const { secure_url } = await this.uploadFile(file);
            return secure_url;
        }));
        return urls
    }


    async uploadManyBase64(
        files: string[],
        source: string
    ) {
        try {
            const urls = await Promise.all(files.map(async (file): Promise<any> => {
                const url = await this.uploadFileFromBase64(file, source)
                return url
            }));
            return urls

        } catch (error) {
            console.log("error", error)
        }
    }

    async uploadFileFromBase64(
        data: string,
        source: string
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return await cloudinary.uploader.upload(data, {
            folder: source
        })
    }

    async uploadFilesFromUrl(
        urls: string[],
    ) {
        return Promise.all(urls.map(async (url: string): Promise<string> => {
            const { secure_url } = await this.uploadFileFromUrl(url);
            return secure_url;
        }));
    }

    async uploadFileFromUrl(
        url: string,
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return cloudinary.uploader.upload(url)
    }

    async getImage(publicId: string) {
        try {
            const { url } = await cloudinary.api.resource(publicId);
            return url;
        } catch (error) {
            console.error("error: ", error);
        }
    }

}