import {AppDataSource} from "../data-source";
import {City} from "../model/city";

class CityService {
    cityRepository: any

    constructor() {
        this.cityRepository = AppDataSource.getRepository(City)
    }

    getAllCity = async () => {
        let sql = `select *
                   from city`
        return await this.cityRepository.query(sql)
    }
}

export default new CityService();