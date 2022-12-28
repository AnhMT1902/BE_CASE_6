import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public readonly userId: number;
    @Column({type: 'varchar'})
    public name: string;
    @Column({type: 'varchar'})
    public password: string;
    @Column({type: 'varchar'})
    public email: string;
    @Column({type: 'varchar'})
    public phone: string;
}