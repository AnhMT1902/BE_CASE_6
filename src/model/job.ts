import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    public readonly jobId: number;
    @Column({type: "int"})
    public companyId: number;
    @Column({type: "int"})
    public categoryId: number;
    @IsNotEmpty()
    @Column({type: "varchar"})
    @IsNotEmpty()
    public title: string;

    @Column({type: "int"})
    public wageStart: number;

    @Column({type: "int"})
    public wageEnd: number;

    @Column({type: "varchar"})
    public addressWork: string;
    @Column({type: "varchar"})//vị trí tuyển dụng
    public vacancies: string;
    @Column({type: "int"})
    public experience: number;
    @IsNotEmpty()
    @Column({type: "int"})
    public status: number;
    @Column({nullable: true, type: "int"})
    public statusTime: number;// full time, part time (0 :full time ; 1 :part time)
    @Column({type: "varchar"})
    public endDate: string;
    @IsNotEmpty()
    @Column({type: "text"})
    public jobDescription: string;
    @Column({nullable: true, type: "text"})
    public codeJob: string; // CODE+ mã cty+ id job
    @Column({type: "int"})
    public applicants: number;
}