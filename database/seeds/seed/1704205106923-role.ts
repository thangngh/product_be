import Role from 'src/models/role/entities/role.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class Role1704205106923 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const roleRepository = dataSource.getRepository(Role)

        const data = [
            {
                roleName: 'USER',
                priority: 1
            },
            {
                roleName: 'CUSTOMER',
                priority: 1
            },
            {
                roleName: 'OWNER',
                priority: 1
            },
            {
                roleName: "ADMIN",
                priority: 2
            }];

        for await (const { roleName, priority } of data) {
            const checkDuplicateRoleName = await roleRepository.findOneBy({
                roleName: roleName
            })

            if (!checkDuplicateRoleName) {
                await roleRepository.insert([{ roleName, priority }])
            }
        }
    }
}
