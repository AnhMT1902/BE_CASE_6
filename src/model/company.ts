import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    public readonly companyId: number;
    @Column({type: "varchar"})
    public name: string;
    @Column({type: "varchar"})
    public email: string;
    @Column({type: "varchar"})
    public password: string;
    @Column({type: "text"})
    public image: string;
    @Column({type: "text"})
    public address: string;
    @Column({type: "int"})
    public numberStaff: number;
    @Column({type: "text"})
    public linkMap: string;
    @Column({type: 'varchar'})
    public companyCode: string // 3 chữ cái đầu tên viết tắt của doanh nghiệp + id daonh nghiệp _ 3 số bất kỳ
    @Column({type: 'varchar'})
    public abbreviatedName: string;
    @Column({type: 'varchar'})
    public phoneNumber: string;
}