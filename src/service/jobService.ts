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
                            join category c on job.categoryId = c.categoryId
                            join company c2 on job.companyId = c2.companyId
                   group by jobId
                   order by jobId`
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
        await this.jobRepository.update({jobId: id}, data)
        return this.findJobByCompanyId(data.companyId)
    }

    deleteJob = async (id) => {
        let query = `delete
                     from job
                     where jobId =` + id
        await this.jobRepository.query(query)
    }

    queryToString(query) {
        let str = ''
        for (const key in query) {
            if (key === 'key') {
                str += `(company.name  like '${query[key]}' or job.title like '%${query[key]}%') and `
            } else {
                if (typeof query[key] === "string") {
                    str += `job.${key} like '${query[key]}' and `
                } else {
                    query[key].forEach((item, index) => {
                        if (index === query[key].length - 1) {
                            str += `job.${key} like '${item}') and `
                        } else if (index === 0) {
                            str += `(job.${key} like '${item}' or `
                        } else {
                            str += `job.${key} like '${item}' or `
                        }
                    })
                }
            }
        }
        return str.substring(0, str.length - 4)
    }

    searchJob = async (query) => {
        let condition = this.queryToString(query)
        let sql = `select *
                   from job
                            join category on job.categoryId = category.categoryId
                            join company on job.companyId = company.companyId
                   where ${condition}
                   group by jobId`
        return await this.jobRepository.query(sql)
    }

    findJobByCompanyId = async (id) => {
        let query = `select *
                     from job
                              join category c on job.categoryId = c.categoryId
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
        if (job[0].status === 0) {
            await this.setStatusJob(id, 1)
        } else {
            await this.setStatusJob(id, 0)
        }
        return await this.findJobByCompanyId(job[0].companyId)
    }
}

