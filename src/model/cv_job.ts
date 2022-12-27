import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Cv_job {
    @PrimaryGeneratedColumn()
    public readonly cv_jobId: number;
    @Column({type: "int"})
    public cvId: number;
    @Column({type: "int"})
    public jobId: number;
}