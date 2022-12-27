import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    public readonly jobId: number;
    @Column({type: "int"})
    public companyId: number;
    @Column({type: "varchar"})
    public title: string;
    @Column({type: "varchar"})
    public wageStart: string;
    @Column({type: "varchar"})
    public wageEnd: string;
    @Column({type: "varchar"})
    public addressWork: string;
    @Column({type: "int"})
    public vacancies: string;
    @Column({type: "varchar"})
    public experience: string;
    @Column({type: "varchar"})
    public status: string;// full time, part time
    @Column({type: "date"})
    public endDate: Date;
    @Column({type: "text"})
    public description: string;
    @Column({type: "text"})
    public codeJob: string; // CODE+ mã cty+ id job
}