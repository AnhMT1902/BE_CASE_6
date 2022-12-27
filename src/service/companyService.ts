import {AppDataSource} from "../data-source";
import {Company} from "../model/company";
import bcrypt from 'bcrypt';

class CompanyService {
    private companyRepository: any

    constructor() {
        this.companyRepository = AppDataSource.getRepository(Company)
    }

    loginCompany = (company) => {
        return company
    }
    registerCompany = async (company) => {
        let sql = `select *
                   from user
                   where email = '${company.email}'`
        let companyFind = await this.companyRepository.query(sql)
        if (companyFind.length !== 0) {
            return {
                message: "email has been used"
            }
        } else {
            company.password = await bcrypt.hash(company.password, 10)
            return this.companyRepository.save(company)
        }
    }
}

export default new CompanyService();