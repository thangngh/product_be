import { Manufacturer } from "src/models/manufacturer/entities/manufacturer.entity";
import { setSeederFactory } from "typeorm-extension";

export default setSeederFactory(Manufacturer, async () => {
    const manufacturer = new Manufacturer()

    return manufacturer
})