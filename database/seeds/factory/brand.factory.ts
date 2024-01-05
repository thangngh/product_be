import { Brand } from "src/models/brand/entities/brand.entity";
import { setSeederFactory } from "typeorm-extension";

export default setSeederFactory(Brand, async () => {
    const brand = new Brand()

    return brand
})