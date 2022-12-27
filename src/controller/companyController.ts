import {Request, Response} from "express";
import CompanyService from "../service/companyService";
import {Company} from "../model/company";

class CompanyController {
    loginCompany = async (req: Request, res: Response) => {
        let company: Company = req.body
        let companyFind = await CompanyService.loginCompany(company)
        return res.status(200).json(companyFind)
    }
    registerCompany = async (req: Request, res: Response) => {
        let company = req.body
        await CompanyService.registerCompany(company)
    }

}

export default new CompanyController();