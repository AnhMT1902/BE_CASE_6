import {Request, Response} from "express";
import {Company} from "../model/company";
import CompanyService from "../service/companyService";
import userService from "../service/userService";

class UserController {
    registerUser = async (req: Request, res: Response) => {
        try {
            let user = req.body
            let userFind = await userService.registerUser(user);
            return res.status(200).json(userFind)
        } catch (e) {
            console.log(e.message)
        }
    }
    loginUser = async (req: Request, res: Response) => {
        let user = req.body
        let userFind = await userService.loginUser(user)
        return res.status(200).json(userFind)
    }
}

export default new UserController();