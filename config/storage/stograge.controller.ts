import { Controller, Get, Param, Post } from "@nestjs/common";
import { StorageService } from "./stograge.service";
import { ApiTags } from "@nestjs/swagger";

@Controller("storage")
@ApiTags()
export class StorageController {
    constructor(
        private readonly storageService: StorageService
    ) { }

    @Get("/get-image/:path/:id")
    getImage(@Param("id") id: string, @Param("path") path: string) {
        return this.storageService.getImage(`${path}/${id}`)
    }
}