import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1704117707156 implements MigrationInterface {
    name = 'InitDb1704117707156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`brand\` (
                \`id\` varchar(36) NOT NULL,
                \`brand_name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`product_attribute\` (
                \`id\` varchar(36) NOT NULL,
                \`create_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                \`update_at\` timestamp NULL,
                \`is_active\` tinyint NOT NULL DEFAULT 1,
                \`attribute_name\` varchar(255) NOT NULL,
                \`attribute_value\` varchar(255) NOT NULL,
                \`product_inventory_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`product_inventory\` (
                \`id\` varchar(36) NOT NULL,
                \`create_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                \`update_at\` timestamp NULL,
                \`is_active\` tinyint NOT NULL DEFAULT 1,
                \`image\` varchar(255) NULL,
                \`product_id\` varchar(255) NOT NULL,
                \`price_in\` int NOT NULL,
                \`price_out\` int NOT NULL,
                \`quantity\` int NOT NULL DEFAULT '0',
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`product_item\` (
                \`id\` varchar(36) NOT NULL,
                \`image\` varchar(255) NULL,
                \`video\` varchar(255) NULL,
                \`product_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`role\` (
                \`id\` varchar(36) NOT NULL,
                \`role_name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NULL,
                \`priority\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_role\` (
                \`id\` varchar(36) NOT NULL,
                \`create_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                \`update_at\` timestamp NULL,
                \`is_active\` tinyint NOT NULL DEFAULT 1,
                \`user_id\` varchar(255) NOT NULL,
                \`role_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` varchar(36) NOT NULL,
                \`create_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                \`update_at\` timestamp NULL,
                \`is_active\` tinyint NOT NULL DEFAULT 1,
                \`user_name\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`first_name\` varchar(255) NOT NULL,
                \`last_name\` varchar(255) NOT NULL,
                \`phone_number\` varchar(255) NULL,
                \`email\` varchar(255) NOT NULL,
                \`gender\` int NULL,
                \`refresh_token\` varchar(255) NOT NULL,
                INDEX \`IDX_7a4fd2a547828e5efe420e50d1\` (\`first_name\`),
                INDEX \`IDX_6937e802be2946855a3ad0e6be\` (\`last_name\`),
                UNIQUE INDEX \`IDX_d34106f8ec1ebaf66f4f8609dd\` (\`user_name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`product\` (
                \`id\` varchar(36) NOT NULL,
                \`create_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                \`update_at\` timestamp NULL,
                \`is_active\` tinyint NOT NULL DEFAULT 1,
                \`product_name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NOT NULL,
                \`brand_id\` varchar(255) NULL,
                \`manufacturer_id\` varchar(255) NULL,
                \`user_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`manufacturer\` (
                \`id\` varchar(36) NOT NULL,
                \`manufacturer_name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`product_attribute\`
            ADD CONSTRAINT \`FK_ce457dadf00a0251ed833f42b43\` FOREIGN KEY (\`product_inventory_id\`) REFERENCES \`product_inventory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`product_inventory\`
            ADD CONSTRAINT \`FK_6a9132b5a1d58a88bb7c405526c\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`product_item\`
            ADD CONSTRAINT \`FK_88ef002ea2f04e6bf896da91692\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_role\`
            ADD CONSTRAINT \`FK_d0e5815877f7395a198a4cb0a46\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_role\`
            ADD CONSTRAINT \`FK_32a6fc2fcb019d8e3a8ace0f55f\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`product\`
            ADD CONSTRAINT \`FK_2eb5ce4324613b4b457c364f4a2\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`product\`
            ADD CONSTRAINT \`FK_3e59a34134d840e83c2010fac9a\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`product\`
            ADD CONSTRAINT \`FK_e694a056cfdd66f7dc01daedc2b\` FOREIGN KEY (\`manufacturer_id\`) REFERENCES \`manufacturer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_e694a056cfdd66f7dc01daedc2b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_3e59a34134d840e83c2010fac9a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_2eb5ce4324613b4b457c364f4a2\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_32a6fc2fcb019d8e3a8ace0f55f\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_d0e5815877f7395a198a4cb0a46\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`product_item\` DROP FOREIGN KEY \`FK_88ef002ea2f04e6bf896da91692\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`product_inventory\` DROP FOREIGN KEY \`FK_6a9132b5a1d58a88bb7c405526c\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`product_attribute\` DROP FOREIGN KEY \`FK_ce457dadf00a0251ed833f42b43\`
        `);
        await queryRunner.query(`
            DROP TABLE \`manufacturer\`
        `);
        await queryRunner.query(`
            DROP TABLE \`product\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_d34106f8ec1ebaf66f4f8609dd\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_6937e802be2946855a3ad0e6be\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_7a4fd2a547828e5efe420e50d1\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_role\`
        `);
        await queryRunner.query(`
            DROP TABLE \`role\`
        `);
        await queryRunner.query(`
            DROP TABLE \`product_item\`
        `);
        await queryRunner.query(`
            DROP TABLE \`product_inventory\`
        `);
        await queryRunner.query(`
            DROP TABLE \`product_attribute\`
        `);
        await queryRunner.query(`
            DROP TABLE \`brand\`
        `);
    }

}
