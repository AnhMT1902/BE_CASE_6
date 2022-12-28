import {Router} from "express";
import {companyRouter} from "./companyRouter";
import {JobRouter} from "./jobRouter";
import {userRouter} from "./userRouter";

export const router = Router();
router.use('/company', companyRouter);
router.use('/user', userRouter);
router.use('/job', JobRouter)

