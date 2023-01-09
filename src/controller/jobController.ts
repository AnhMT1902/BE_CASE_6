import {JobService} from "../service/jobService";
import {Request, Response} from 'express'

class JobController {
    private jobService: JobService

    constructor() {
        this.jobService = new JobService()
    }

    getAll = async (req: Request, res: Response) => {
        try {
            let job = await this.jobService.findAll()
            return res.status(200).json({job: job})
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
    add = async (req: Request, res: Response) => {
        try {
            let job = await this.jobService.addJob(req.body)
            res.status(200).json(job)
        } catch (e) {
            res.json({
                abc: "abc",
                mess: e.message
            })
        }
    }
    edit = async (req: Request, res: Response) => {
        try {
            let job = await this.jobService.editJob(req.params.id, req.body)
            res.status(200).json({
                job,
                mess: "ok"
            })
        } catch (e) {
            console.log(e)
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            let jobs = await this.jobService.deleteJob(req.params.id)
            res.status(200).json({jobs, message: 'delete success'})
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
    search = async (req: Request, res: Response) => {
        try {
            let query = req.query
            let job = await this.jobService.searchJob(query)
            return res.status(200).json(job)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
    findJobByCompanyId = async (req: Request, res: Response) => {
        try {
            let job = await this.jobService.findJobByCompanyId(req.params.id)
            return res.status(200).json(job)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
    findJobById = async (req: Request, res: Response) => {
        try {
            let job = await this.jobService.findJobById(req.params.id)
            return res.status(200).json(job)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    editStatusJobById = async (req: Request, res: Response) => {
        try {
            let jobs = await this.jobService.editStatusJobById(req.params.id)
            return res.status(200).json({
                jobs,
                mess: "Thanh cong"
            })
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
}

export default new JobController();