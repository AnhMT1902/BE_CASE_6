import {Router} from "express";
import {companyRouter} from "./companyRouter";
import {JobRouter} from "./jobRouter";

export const router = Router();
router.use('/company', companyRouter)
router.use('/job', JobRouter)
