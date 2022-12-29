import {AppDataSource} from "../data-source";
import {Job} from "../model/job";
import {validate} from "class-validator";

export class JobService {
    private jobRepository: any

    constructor() {
        this.jobRepository = AppDataSource.getRepository(Job)
    }

    findAll = async () => {
        let job = await this.jobRepository.find()
        return job
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
                let job = await this.jobRepository.save(data)
                return job
            }
        })

    }
    editJob = async (id, data) => {
        let query = `UPDATE job
                     SET companyId   = ${data.companyId},
                         title       = '${data.title}',
                         wageStart   ='${data.wageStart}',
                         wageEnd     ='${data.wageEnd}',
                         addressWork ='${data.addressWork}',
                         vacancies   ='${data.vacancies}',
                         experience  ='${data.experience}',
                         status      =${data.status},
                         endDate     ='${data.endDate}',
                         description ='${data.description}',
                         codeJob     ='${data.codeJob}'
                     WHERE jobId = ${id}`;
        return await this.jobRepository.query(query)
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
        let jobs = await this.jobRepository.query(query)
        return jobs
    }
    searchAddress = async (job) => {
        let query = `select *
                     from job
                     where addressWork like '%${job.addressWork}%'`
        let address = await this.jobRepository.query(query)
        return address
    }
    findJobById = async (id)=>{
        let query = `select *
                     from job
                     where companyId = ${id}`
        let job = await this.jobRepository.query(query)
        return job
    }
    jobStatus = async (id) => {
        let query = `select *
                     from job
                     where jobId = ${id}`
        let job = await this.jobRepository.query(query)

        if (job[0].status == 0) {
            let query = `update job
                         set status = 1
                         where jobId = ${id}`
            await this.jobRepository.query(query)
        }
        if (job[0].status == 1) {
            let query = `update job
                         set status = 0
                         where jobId = ${id}`
            await this.jobRepository.query(query)
        }
        let jobs = await this.jobRepository.query(`select *
                                                   from job
                                                   where jobId = ${id}`)
        return jobs
    }


}

