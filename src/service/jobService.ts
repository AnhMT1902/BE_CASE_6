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
                            join category on category.categoryId = job.categoryId
                            join company on job.companyId = company.companyId
                            join city on company.address = city.cityId
                   where status = 0
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
        dataValidator.jobDescription = data.jobDescription
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
        return await this.findJobByCompanyId(id)
    }

    objectToString(query) {
        let str = ''
        for (const key in query) {
            if (key === 'key') {
                let arrKey = query[key].split(' ')
                str += `(job.title like '${query[key]}' or `
                arrKey.map((value, index) => {
                    if (index === arrKey.length - 1) {
                        str += `job.title like '%${value}%') and `
                    } else {
                        str += `job.title like '%${value}%' or `
                    }
                })
            } else if (key === "address") {
                let arrKey = query[key].split(',')
                if (arrKey.length === 1) {
                    str += `company.address like ${arrKey[0]} and `
                } else {
                    let res = ''
                    arrKey.map((item, index) => {
                        if (index === 0) {
                            res += `(company.address like ${item} or `
                        }
                        if (index === arrKey.length - 1) {
                            res += `company.address like ${item}) and `
                        } else {
                            res += `company.address like ${item} or `
                        }
                    })
                    str += res
                }
            } else if (key === 'wage') {
                let arrKey = query[key].split(',')
                str += `((wageStart between ${arrKey[0]}000000 AND ${arrKey[1]}000000) or (wageEnd between ${arrKey[0]}000000 AND ${arrKey[1]}000000)) and `
            } else {
                let arrValue = query[key].split(',')
                if (arrValue.length === 1) {
                    str += `job.${key} like '${query[key]}' and `
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
        let condition = this.objectToString(ojb)
        let sql = `select *
                   from job
                            join category on category.categoryId = job.categoryId
                            join company on job.companyId = company.companyId
                            join city on company.address = city.cityId
                   where ${condition || "1=1"}
                     and job.status = 0
                   group by jobId`
        console.log(sql)
        return await this.jobRepository.query(sql)
    }

    findJobByCompanyId = async (id) => {
        let query = `select *
                     from job
                              join category on category.categoryId = job.categoryId
                              join company on job.companyId = company.companyId
                              join city on company.address = city.cityId
                     where company.companyId = ${id}
                     group by jobId
                     order by jobId`
        return await this.jobRepository.query(query)
    }

    findJobById = async (id) => {
        let query = `select *
                     from job
                              join category on category.categoryId = job.categoryId
                              join company on job.companyId = company.companyId
                              join city on company.address = city.cityId
                     where job.jobId = ${id}`
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

