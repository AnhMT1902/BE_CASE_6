import {Router} from "express";
import CvController from "../controller/cvController";


export const cvRouter = Router();
cvRouter.get('',CvController.getCvByCompanyId)
