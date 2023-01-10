import {Router} from "express";
import CompanyController from "../controller/companyController";

export const companyRouter = Router();
companyRouter.post('/login', CompanyController.loginCompany)
companyRouter.post('/register', CompanyController.registerCompany)
companyRouter.get('/top-companies',CompanyController.searchTopCompany)
companyRouter.put('/update/:companyId', CompanyController.updateCompany)
companyRouter.get('/:companyId', CompanyController.findCompanyById)
companyRouter.get('',CompanyController.getAll)
companyRouter.post('/search',CompanyController.search)

