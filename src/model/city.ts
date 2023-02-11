import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    public readonly cityId: number;
    @Column({
        nullable: true, type: "varchar"
    })
    public nameCity: string;
}