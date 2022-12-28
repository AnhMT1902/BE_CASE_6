import {Router} from "express";
import CompanyController from "../controller/companyController";
import userController from "../controller/userController";

export const userRouter = Router();
userRouter.post('/register',userController.registerUser)
userRouter.post('/login',userController.loginUser)