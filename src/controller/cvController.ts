import {Request, Response} from "express";
import CvService from "../service/cvService";
import nodemailer from "nodemailer"

class CvController {
    getCvByJobId = async (req: Request, res: Response) => {
        try {
            let cv = await CvService.getCvByJobId(req.params.id)
            return res.status(200).json(cv)
        } catch (err) {
            return res.status(200).json(err)
        }
    }
    addCv = async (req: Request, res: Response) => {
        try {
            let cv = await CvService.addCv(req.body)
            return res.status(200).json(cv)
        } catch (err) {
            return res.status(200).json(err)
        }
    }
}

export default new CvController()