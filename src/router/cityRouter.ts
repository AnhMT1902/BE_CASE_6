import {Router} from "express";
import CityController from "../controller/cityController";

export const cityRouter = Router();
cityRouter.get("", CityController.getAllCity)