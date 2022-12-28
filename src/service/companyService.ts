import {AppDataSource} from "../data-source";
import {Company} from "../model/company";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

class CompanyService {
    private companyRepository: any

    constructor() {
        this.companyRepository = AppDataSource.getRepository(Company)
    }

    loginCompany = async (company) => {
        let companyFind = (await this.findCompanyByEmail(company.email));
        if (companyFind.length === 0) {
            return {
                message: "Incorrect login information"
            }
        } else {
            let comparePassword = await bcrypt.compare(company.password, companyFind[0].password)
            if (!comparePassword) {
                return {
                    message: "Password wrong!!!"
                }
            } else {
                let payload = {
                    id: companyFind[0].companyId,
                    email: companyFind[0].email
                }
                let secret = 'job';
                let token = jwt.sign(payload, secret, {
                    expiresIn: 36000
                })
                return {
                    token: token,
                    company: companyFind[0]
                }
            }
        }
    }

    findCompanyByEmail = async (email) => {
        let sql = `select *
                   from company
                   where email = '${email}'`
        return await this.companyRepository.query(sql);
    }

    registerCompany = async (company) => {
        let companyFind = await this.findCompanyByEmail(company.email)
        if (companyFind.length !== 0) {
            return {
                message: "email has been used", checkRegister: false
            }
        } else {
            company.password = await bcrypt.hash(company.password, 10);
            await this.companyRepository.save(company)
            return {
                message: "register success", checkRegister: true
            }
        }
    }
    updateCompany = (company) => {
        return this.companyRepository.update({companyId: company.companyId}, company)
    }

}

export default new CompanyService();