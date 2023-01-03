import {Router} from "express";
import JobController from "../controller/jobController";
import jobController from "../controller/jobController";

export const JobRouter = Router();
JobRouter.get('/',JobController.getAll)
JobRouter.post('/',JobController.add)
JobRouter.put('/:id',JobController.edit)
JobRouter.delete('/:id',jobController.delete)
JobRouter. get('/search',jobController.search)
JobRouter.put('/status/:id',JobController.editStatusJobById)
JobRouter.post('/company/:id',JobController.findJobById)

