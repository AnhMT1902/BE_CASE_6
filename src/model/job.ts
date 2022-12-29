import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    public readonly jobId: number;
    @Column({type: "int"})
    public companyId: number;
    @IsNotEmpty()
    @Column({type: "varchar"})
    @IsNotEmpty()
    public title: string;
    @Column({type: "varchar"})
    public wageStart: string;
    @Column({type: "int"})
    public wageEnd: string;
    @Column({type: "int"})
    public addressWork: string;
    @Column({type: "varchar"})//vị trí tuyển dụng
    public vacancies: string;
    @Column({type: "varchar"})
    public experience: string;
    @IsNotEmpty()
    @Column({type: "boolean"})
    public status: boolean ;
    @Column({nullable:true,type: "boolean"})
    public statusTime: boolean ;// full time, part time
    @Column({type: "date"})
    public endDate: Date;
    @IsNotEmpty()
    @Column({type: "text"})
    public description: string;
    @Column({nullable:true ,type: "text"})
    public codeJob: string; // CODE+ mã cty+ id job
}