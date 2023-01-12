import {AppDataSource} from "../data-source";
import {Cv} from "../model/cv";
import {Cv_job} from "../model/cv_job";

class CvService {
    cvRepository: any
    cv_jobRepository: any

    constructor() {
        this.cvRepository = AppDataSource.getRepository(Cv)
        this.cv_jobRepository = AppDataSource.getRepository(Cv_job)
    }

    getCvByJobId = async (id) => {
        let sql = `select *
                   from cv
                            join user on cv.userId = user.userId
                            join cv_job on cv.cvId = cv_job.cvId
                   where jobId = ${id}`
        return this.cvRepository.query(sql)
    }

    addCv = async (data) => {
        let newCv = {
            image: data.image,
            userId: data.userId,
            cv_des: data.cv_des
        };
        console.log(newCv)
        await this.cvRepository.save(newCv)
        let sql = `select *
                   from cv
                   order by cvId desc limit 1;`
        let cv = await this.cvRepository.query(sql)
        let newCv_job = {
            cvId : cv[0].cvId,
            jobId : data.jobId
        }
        await this.cv_jobRepository.save(newCv_job)
        return await this.getCvByJobId(data.jobId)
    }

}

export default new CvService();