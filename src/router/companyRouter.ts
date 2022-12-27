import {Router} from "express";
import CompanyController from "../controller/companyController";

export const companyRouter = Router();
companyRouter.post('/login', CompanyController.loginCompany)
companyRouter.post('/register', CompanyController.registerCompany)