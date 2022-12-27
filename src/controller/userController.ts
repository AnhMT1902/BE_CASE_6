import {Request, Response} from "express";
import {Company} from "../model/company";
import CompanyService from "../service/companyService";
import userService from "../service/userService";

class UserController {
    registerUser = async (req: Request, res: Response) => {
        let user = req.body
        let companyFind = await userService.registerUser(user);
        return res.status(200).json(companyFind)
    }
}

export default new UserController();