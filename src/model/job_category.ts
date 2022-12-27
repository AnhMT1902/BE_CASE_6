import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Job_category {
    @PrimaryGeneratedColumn()
    public readonly job_categoryId: number;
    @Column({type: "int"})
    public jobId: number;
    @Column({type: "int"})
    public categoryId: number;
}