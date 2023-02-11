import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail, IsNotEmpty, Max, MAX, Min} from "class-validator";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    public readonly companyId: number;
    @Column({
        nullable: true, type: "varchar"
    })
    public name: string;
    @Column({
        nullable: true, type: "varchar"
    })
    @IsNotEmpty()
    @IsEmail()
    public email: string;
    @Column({
        nullable: true, type: "varchar"
    })
    @IsNotEmpty()
    public password: string;
    @Column({
        nullable: true, type: "text"
    })
    public image: string;
    @Column({
        nullable: true, type: "text"
    })
    public description: string;
    @Column({
        nullable: true, type: "int"
    })
    public address: number;
    @Column({
        nullable: true, type: "int"
    })
    public numberStaff: number;
    @Column({
        nullable: true, type: "text"
    })
    public linkMap: string;
    @Column({
        nullable: true, type: 'varchar'
    })
    public companyCode: string // 3 chữ cái đầu tên viết tắt của doanh nghiệp + id daonh nghiệp _ 3 số bất kỳ
    @Column({
        nullable: true, type: 'varchar'
    })
    public abbreviatedName: string;
    @Column({
        nullable: true, type: 'varchar'
    })
    public phoneNumber: string;
    @Column({
        nullable: true, type: 'varchar'
    })
    public website: string;
}