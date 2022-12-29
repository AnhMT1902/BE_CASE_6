import {AppDataSource} from "../data-source";
import {Job} from "../model/job";
import {validate} from "class-validator";

export class JobService {
    private jobRepository: any

    constructor() {
        this.jobRepository = AppDataSource.getRepository(Job)
    }

    findAll = async () => {
        return await this.jobRepository.find()
    }
    addJob = async (data) => {
        let dataValidator = new Job()
        dataValidator.title = data.title
        dataValidator.wageStart = data.wageStart
        dataValidator.wageEnd = data.wageEnd
        dataValidator.addressWork = data.addressWork
        dataValidator.vacancies = data.vacancies
        dataValidator.experience = data.experience
        dataValidator.status = data.status
        dataValidator.endDate = data.endDate
        dataValidator.description = data.description
        return await validate(dataValidator).then(async (error) => {
            if (error.length > 0) {
                return {
                    message: "add error"
                }
            } else {
                return await this.jobRepository.save(data)
            }
        })

    }
    editJob = async (id, data) => {
        return await this.jobRepository.update({jobId: +id}, data)
    }
    deleteJob = async (id) => {
        let query = `delete
                     from job
                     where jobId =` + id
        await this.jobRepository.query(query)
    }
    searchJob = async (job) => {
        let query = `select *
                     from job
                     where title like '%${job.title}%'`
        return await this.jobRepository.query(query)
    }
    searchAddress = async (job) => {
        let query = `select *
                     from job
                     where addressWork like '%${job.addressWork}%'`
        return await this.jobRepository.query(query)

    }
    findJobById = async (id) => {
        let query = `select *
                     from job
                     where companyId = ${id}`
        return await this.jobRepository.query(query)

    }
    setStatusJob = async (jobId, status) => {
        let query = `update job
                     set status = ${status}
                     where jobId = ${jobId}`
        return await this.jobRepository.query(query)
    }
    jobStatus = async (id) => {
        let query = `select *
                     from job
                     where jobId = ${id}`
        let job = await this.jobRepository.query(query)
        if (job[0].status === false) {
            this.setStatusJob(id, true)
        } else {
            this.setStatusJob(id, false)
        }
        return await this.findJobById(id)

    }


}

