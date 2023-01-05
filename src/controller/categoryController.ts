import {Request, Response} from "express";
import CategoryService from "../service/categoryService";

class CategoryController {
    getAllCategory = async (req: Request, res: Response) => {
        try {
            let category = await CategoryService.getAllCategory()
            return res.status(200).json(category)
        } catch (e) {
            return res.status(200).json({
                message: e.message
            })
        }
    }
}

export default new CategoryController()