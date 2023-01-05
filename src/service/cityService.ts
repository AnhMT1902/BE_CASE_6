import {AppDataSource} from "../data-source";
import {City} from "../model/city";

class CityService {
    cityRepository: any

    constructor() {
        this.cityRepository = AppDataSource.getRepository(City)
    }

    getAllCity = async () => {
        return await this.cityRepository.find()
    }
}

export default new CityService();