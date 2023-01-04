import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    public readonly categoryId: number;
    @Column({type: "varchar"})
    public nameCategory: string;
}