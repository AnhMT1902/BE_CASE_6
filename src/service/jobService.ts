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

    objectToString(ojb) {
        let str = ''
        for (const key in ojb) {
            if (key === 'key') {
                str += `(company.name  like '${ojb[key]}' or job.title like '%${ojb[key]}%') and `
            } else {
                let arrValue = ojb[key].split(',')
                console.log(arrValue)
                if (arrValue.length <= 1) {
                    str += `job.${key} like '${ojb[key]}' and `
                } else {
                    arrValue.forEach((item, index) => {
                        if (index === arrValue.length - 1) {
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

    searchJob = async (ojb) => {
        console.log(ojb)
        let condition = this.objectToString(ojb)
        let sql = `select *
                   from job
                            join category on job.categoryId = category.categoryId
                            join company on job.companyId = company.companyId
                   where ${condition}
                   group by jobId`
        console.log(sql)
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

