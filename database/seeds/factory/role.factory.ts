import Role from "src/models/role/entities/role.entity";
import { setSeederFactory } from "typeorm-extension";

export default setSeederFactory(Role, async () => {
    const role = new Role()

    return role
})