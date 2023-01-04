import {Router} from "express";
import CityController from "../controller/cityController";
import CategoryController from "../controller/categoryController";
import {categoryRouter} from "./categoryRouter";

export const cityRouter = Router();
cityRouter.get("", CityController.getAllCity)