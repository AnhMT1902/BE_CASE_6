import {AppDataSource} from "../data-source";
import {Job} from "../model/job";


export class JobService {
    private jobRepository: any

    constructor() {
        this.jobRepository = AppDataSource.getRepository(Job)
    }

    findAll = async () => {
        let job = await this.jobRepository.find()
        return job
    }
    add = async (data) => {
        let job = await this.jobRepository.save(data)
        return job
    }
    edit = async (id, data) => {
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
                           codeJob='${data.codeJob}'
                       WHERE jobId = ${id}`;
        await this.jobRepository.query(query)

    }
    delete = async (id) => {
       let query = `delete from job where jobId =` + id
        await this.jobRepository.query(query)
    }
    search = async (job) => {
        let query = `select * from job where title like '%${job.title}%'`
        await this.jobRepository.query(query)
    }
}

