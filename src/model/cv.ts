import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Cv {
    @PrimaryGeneratedColumn()
    public readonly cvId: number;
    @Column({type: "text"})
    public image: string;
}