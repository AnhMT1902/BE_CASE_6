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

    @Column({type: "text"})
    public addressWork: string;
    @Column({type: "varchar"})//vị trí tuyển dụng
    public vacancies: string;
    @Column({type: "varchar"})
    public experience: string;
F

    @IsNotEmpty()
    @Column({type: "int"})
    public status: number;


    @Column({nullable: true, type: "int"})
    public statusTime: number;// full time, parttime
    @Column({type: "varchar"})
    public endDate: string;
    @IsNotEmpty()
    @Column({type: "text"})
    public description: string;
    @Column({nullable: true, type: "text"})
    public codeJob: string; // CODE+ mã cty+ id job
}