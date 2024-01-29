import { Injectable, PipeTransform, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp'
import * as fs from 'fs';
import * as tmp from 'tmp'
@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File, Promise<string>> {

    private readonly maxSize = 1024 * 1024 * 2  //2MB;
    private readonly allowedMimeTypes = ['image/jpeg', 'image/png', "image/gif", "image/bmp ", "image/svg+xml", "image/webp"]

    async transform(file: Express.Multer.File): Promise<any> {
        const fileLocal: any[] = [];
        if (Array.isArray(file)) {
            for (const fl of file) {
                if (this.maxSize < fl.size) {
                    throw new BadRequestException('File is too large');
                }

                if (!this.allowedMimeTypes.includes(fl.mimetype)) {
                    throw new BadRequestException('Invalid file type');
                }

                const originalName = path.parse(fl.originalname).name;
                const ext = fl.mimetype.startsWith("image/") ? ".webp" : ".webm"
                const filename = Date.now() + '-' + originalName + ext
                if (fl.mimetype.startsWith('image/')) {
                    // await sharp(fl.buffer)
                    // 	.resize(400)
                    // 	.webp({ effort: 3 })
                    // 	.toFile(path.join('uploads', filename));

                    const imageBuffer = await sharp(fl.buffer)
                        .resize(400)
                        .webp({ effort: 3 })
                        .toBuffer();

                    const base64String = imageBuffer.toString('base64');

                    fileLocal.push({ filename, buffer: imageBuffer, base64Img: base64String })
                }
                if (fl.mimetype.startsWith('video/')) {
                    // try {
                    // 	const tmpFile = tmp.fileSync();
                    // 	fs.writeFileSync(tmpFile.name, fl.buffer)
                    // 	await new Promise((resolve, reject) => {
                    // 		ffmpeg(tmpFile.name)
                    // 			.size('320x240')
                    // 			.output(path.join('uploads', filename))
                    // 			.on("end", resolve)
                    // 			.on("error", reject)
                    // 			.run()
                    // 	})
                    // } catch (error) {
                    // 	throw new HttpException("Some thing went wrong!", HttpStatus.BAD_REQUEST)
                    // }

                }
                // fileLocal.push(filename)
            }
            return fileLocal;
        }

        console.log("fileLocal", fileLocal)

    }
}