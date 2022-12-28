import {Router} from "express";
import {companyRouter} from "./companyRouter";
import {userRouter} from "./userRouter";
import {sendMailRouter} from "./send-mailRouter";

export const router = Router();
router.use('/company', companyRouter);
router.use('/user', userRouter);
router.use('/send-mail', sendMailRouter);