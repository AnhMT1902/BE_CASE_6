import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {

    Length,

    IsDate,

} from "class-validator"
@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    public readonly jobId: number;
    @Column({type: "int"})
    public companyId: number;
    @Column({type: "varchar"})
    @Length(10, 20)
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
    @IsDate()
    createDate: Date
    @Column({type: "text"})
    public description: string;
    @Column({type: "text"})
    public codeJob: string; // CODE+ mã cty+ id job
}