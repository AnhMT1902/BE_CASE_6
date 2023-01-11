import {Request, Response} from "express";
import CvService from "../service/cvService";

class CvController {
    getCvByJobId = async (req: Request, res: Response) => {
        try {
            let cv = await CvService.getCvByJobId(req.params.id)
            return res.status(200).json(cv)
        } catch (err) {
            return res.status(200).json(err)
        }
    }
}

export default new CvController()