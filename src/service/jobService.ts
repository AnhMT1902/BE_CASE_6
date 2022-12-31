import {AppDataSource} from "../data-source";
import {Job} from "../model/job";
import {validate} from "class-validator";

export class JobService {
    private jobRepository: any

    constructor() {
        this.jobRepository = AppDataSource.getRepository(Job)
    }

    findAll = async () => {
        let sql = `select *
                   from job
                            join category
                   group by jobId`
        return await this.jobRepository.query(sql)
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
        dataValidator.applicants = data.applicants

        return await validate(dataValidator).then(async (error) => {
            if (error.length > 0) {
                return {
                    message: "validate fail"
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
                              join category
                     where title like '%${job.title}%'
                     group by jobId`
        return await this.jobRepository.query(query)
    }
    searchAddress = async (job) => {
        let query = `select *
                     from job
                              join category
                     where addressWork like '%${job.addressWork}%'
                     group by jobId`
        return await this.jobRepository.query(query)
    }
    findJobById = async (id) => {
        let query = `select *
                     from job
                              join category
                     where companyId = ${id}
                     group by jobId`
        return await this.jobRepository.query(query)
    }
    setStatusJob = async (jobId, status) => {
        let query = `update job
                         join category
                     set status = ${status}
                     where jobId = ${jobId}`
        return await this.jobRepository.query(query)
    }
    editStatusJobById = async (id) => {
        let query = `select *
                     from job
                     where jobId = ${id}`
        let job = await this.jobRepository.query(query)
        console.log(job)
        if (job[0].status === 0) {
            await this.setStatusJob(id, 1)
        } else {
            await this.setStatusJob(id, 0)
        }
        return await this.findJobById(id)
    }
}

