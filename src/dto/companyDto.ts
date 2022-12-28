import {IsEmail, Length, Min} from "class-validator";

export abstract class CompanyDto {
    @IsEmail()
    email: string;
    @Length(8, 20)
    password: string;
}