import { Manufacturer } from 'src/models/manufacturer/entities/manufacturer.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class Manufacturer1704202631459 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const data = ["Việt Nam", "Trung Quốc", "Thái lan"]

        const repository = dataSource.getRepository(Manufacturer)

        for await (const dt of data) {

            const duplicate = await repository.findOneBy({
                manufacturerName: dt
            })

            if (!duplicate) {
                await repository.insert([{ manufacturerName: dt }])
            }
        }
    }
}
