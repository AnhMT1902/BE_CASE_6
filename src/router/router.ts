import {Router} from "express";
import {companyRouter} from "./companyRouter";
import {JobRouter} from "./jobRouter";
import {userRouter} from "./userRouter";
import {categoryRouter} from "./categoryRouter";
import {cityRouter} from "./cityRouter";
import {cvRouter} from "./cvRouter";

export const router = Router();
router.use('/company', companyRouter);
router.use('/user', userRouter);
router.use('/job', JobRouter);
router.use('/category', categoryRouter);
router.use('/city', cityRouter);
router.use('/cv',cvRouter)

