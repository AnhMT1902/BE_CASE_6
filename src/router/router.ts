import {Router} from "express";
import {companyRouter} from "./companyRouter";
import {userRouter} from "./userRouter";

export const router = Router();
router.use('/company', companyRouter);
router.use('/user', userRouter);