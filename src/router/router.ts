import {Router} from "express";
import {companyRouter} from "./companyRouter";

export const router = Router();
router.use('/company', companyRouter)