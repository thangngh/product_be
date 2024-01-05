import { Brand } from 'src/models/brand/entities/brand.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class Brand1704202897483 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const data = ["ASUS", "Gucci", "Dell"]

        const repository = dataSource.getRepository(Brand)

        for await (const dt of data) {

            const duplicate = await repository.findOneBy({
                brandName: dt
            })

            if (!duplicate) {
                await repository.insert([{ brandName: dt }])
            }
        }
    }
}
