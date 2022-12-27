import {Request, Response} from "express";
import CompanyService from "../service/companyService";
import {Company} from "../model/company";
import {validate} from "class-validator";

class CompanyController {
    loginCompany = async (req: Request, res: Response) => {
        let company: Company = req.body
        let companyFind = await CompanyService.loginCompany(company);
        return res.status(200).json(companyFind)
    }
    registerCompany = async (req: Request, res: Response) => {
        let company: Company = req.body
        company.password = '12345678'
        let companyFind = await CompanyService.registerCompany(company);
        return res.status(200).json(companyFind)
    }
}


export default new CompanyController();