import {JobService} from "../service/jobService";
import {request, Request, Response} from 'express'

class JobController {
    private jobService: JobService

    constructor() {
        this.jobService = new JobService()
    }

    getAll = async (req: Request, res: Response) => {
        try {
            let job = await this.jobService.findAll()
            return res.status(200).json(job)

        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
    add = async (req: Request, res: Response) => {
        try {
            let job = await this.jobService.add(req.body)
            res.status(200).json(job)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
    edit = async (req: Request, res: Response) => {
        try {
            let job = await this.jobService.edit(req.params.id, req.body)
            res.status(200).json({message: 'edit success'})
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            let job = await this.jobService.delete(req.params.id)
            res.status(200).json({message: 'delete success'})
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
    search = async (req:Request,res:Response)=>{
        try {
            let job = await this.jobService.search(req.body)
           return  res.status(200).json(job)
        }
        catch (e){
            res.json({
                mess:e.message
            })
        }
    }
}

export default new JobController();