import {AppDataSource} from "../data-source";
import {Category} from "../model/category";

class CategoryService {
    categoryRepository: any
    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category)
    }
    getAllCategory = async () => {
        return await this.categoryRepository.find()
    }
}

export default new CategoryService();