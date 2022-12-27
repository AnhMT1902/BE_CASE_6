import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CompanyDto} from "../dto/companyDto";

@Entity()
export class Company extends CompanyDto {
    @PrimaryGeneratedColumn()
    public readonly companyId: number;
    @Column({
        nullable: true, type: "varchar"
    })
    public name: string;
    @Column({
        nullable: true, type: "varchar"
    })
    public email: string;
    @Column({
        nullable: true, type: "varchar"
    })
    public password: string;
    @Column({
        nullable: true, type: "text"
    })
    public image: string;
    @Column({
        nullable: true, type: "text"
    })
    public address: string;
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
}