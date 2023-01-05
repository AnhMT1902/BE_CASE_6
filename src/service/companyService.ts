import {AppDataSource} from "../data-source";
import {Company} from "../model/company";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import {validate} from "class-validator";

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

    findCompanyById = async (id) => {
        let sql = `select *
                   from company
                   where companyId = ${id}`
        return await this.companyRepository.query(sql);
    }
    findAll = async () => {
        let sql = `select *
                   from job
                            join category c on job.categoryId = c.categoryId
                            join company c2 on job.companyId = c2.companyId
                   group by jobId
                   order by jobId`
        return await this.companyRepository.query(sql)
    }

    registerCompany = async (company) => {
        let companyRegister = new Company()
        companyRegister.email = company.email
        companyRegister.name = company.name
        companyRegister.image = company.image
        companyRegister.address = company.address
        companyRegister.numberStaff = company.numberStaff
        companyRegister.linkMap = company.linkMap
        companyRegister.companyCode = company.companyCode
        companyRegister.password = company.password
        companyRegister.abbreviatedName = company.abbreviatedName
        companyRegister.phoneNumber = company.phoneNumber
        return await validate(companyRegister).then(async (errors) => {
            if (errors.length > 0) {
                return {
                    message: 'validation failed. errors:'
                }
            } else {
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
        });
    }

    findCompanyByIdCompany = async (id) => {
        console.log(id, 'id')
        let sql = `select *
                   from company
                            join city on city.cityId = company.address
                   where companyId = '${id}'`
        return await this.companyRepository.query(sql);
    }

    updateCompany = async (company) => {
        company.companyCode = `${company.abbreviatedName.substring(0, 3)}${+company.companyId - 1}${Math.floor(Math.random() * 4 + 1000)}`
        console.log(company, "company")
        this.companyRepository.update({companyId: company.companyId}, company)
        return await this.findCompanyByIdCompany(company.companyId)
    }
}

export default new CompanyService();