import {Request, Response} from "express";
import CompanyService from "../service/companyService";
import {Company} from "../model/company";
import {validate} from "class-validator";

class CompanyController {

    loginCompany = async (req: Request, res: Response) => {
        try {
            let company = req.body
            let companyFind = await CompanyService.loginCompany(company);
            return res.status(200).json(companyFind)
        } catch (e) {
            console.log(e.message)
        }

    }
    registerCompany = async (req: Request, res: Response) => {
        let company: Company = req.body
        company.password = '12345678'
        let companyFind = await CompanyService.registerCompany(company);
        console.log(companyFind)
        return res.status(200).json(companyFind)
    }
    updateCompany = async (req: Request, res: Response) => {
        let companyEdit = req.body
        companyEdit.companyId = +req.params.companyId
        let companyFind = await CompanyService.updateCompany(companyEdit);
        return res.status(200).json(companyFind)
    }
}


export default new CompanyController();