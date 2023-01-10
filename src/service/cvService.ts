import {AppDataSource} from "../data-source";
import {Cv} from "../model/cv";

class CvService {
    cvRepository: any

    constructor() {
        this.cvRepository = AppDataSource.getRepository(Cv)
    }

    getCvByCompanyId = async (id) => {
        let sql = ``
    }

}

export default new CvService();