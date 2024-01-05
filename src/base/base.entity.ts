import { Type } from 'class-transformer'
import { IsBoolean, IsDate, IsOptional } from 'class-validator'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export default class BaseEntities extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Type(() => Date)
    @IsDate()
    @Column({
        name: 'create_at',
        nullable: true,
        default: () => "now()",
        type: 'timestamp'
    })
    createAt: Date

    @Type(() => Date)
    @IsDate()
    @IsOptional()
    @Column({
        name: 'update_at',
        nullable: true,
        type: 'timestamp'
    })
    updateAt: Date

    @IsBoolean()
    @Column({
        name: 'is_active',
        type: "boolean",
        default: true
    })
    isActive: boolean
}