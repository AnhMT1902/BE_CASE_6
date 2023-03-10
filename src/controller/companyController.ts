import {Request, Response} from "express";
import CompanyService from "../service/companyService";
import companyService from "../service/companyService";
import nodemailer from 'nodemailer';

class CompanyController {

    loginCompany = async (req: Request, res: Response) => {
        try {
            let company = req.body
            let companyFind = await CompanyService.loginCompany(company);
            return res.status(200).json(companyFind)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }

    }

    registerCompany = async (req: Request, res: Response) => {
        try {
            const password = await this.randomPassword()
            console.log(password)
            let company = req.body
            company.password = password
            let companyFind = await CompanyService.registerCompany(company);
            if (companyFind.checkRegister) {
                return this.sendMailForCompany(req, res, password, company.email, companyFind);
            } else return res.status(200).json(companyFind)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    updateCompany = async (req: Request, res: Response) => {
        try {
            let companyEdit = req.body
            companyEdit.companyId = +req.params.companyId
            let companyFind = await CompanyService.updateCompany(companyEdit);
            return res.status(200).json(companyFind)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }


    updateImageCompany = async (req: Request, res: Response) => {
        try {
            let companyFind = await CompanyService.updateImageCompany(req.body.image, req.params.companyId);
            return res.status(200).json(companyFind)
        } catch (err) {
            res.json({
                mess: err.message
            })
        }
    }

    sendMailForCompany = (req, res, password, email, companyFind) => {
        let transporter = nodemailer.createTransport({ // config mail server
            service: 'gmail',
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: 'find.jobc07@gmail.com', //T??i kho???n gmail v???a t???o
                pass: 'utrmdjfrigniottr'//M???t kh???u t??i kho???n gmail v???a t???o
            }
        });
        let mainOptions = { // thi???t l???p ?????i t?????ng, n???i dung g???i mail
            from: 'find.jobc07@gmail.com',
            to: `${email}`,
            subject: `Xin ch??o ${email}`,
            text: `m???t kh???u ????ng nh???p c???a b???n l??: "${password}"
            b???n c?? th??? ????ng nh???p t???i http://localhost:3000/work/login
               `//Th?????ng thi m??nh kh??ng d??ng c??i n??y thay v??o ???? m??nh s??? d???ng html ????? d??? edit h??n
            // html: content //N???i dung html m??nh ???? t???o tr??n kia :))
        }
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
                return res.status(200).json({
                    message: `mess, L???i g???i mail:  + ${err}`
                })
            } else {
                companyFind.email = 'Message sent: ' + info.response
                //G???i th??ng b??o ?????n ng?????i d??ng
                return res.status(200).json(companyFind)
            }
        });
    }
    randomPassword = async () => {
        let str = `qwpc89vbnerag6h7styu234iodfjklzxm150`
        console.log(str.length)
        let password = ''
        while (password.length <= 8) {
            password += str[Math.floor(Math.random() * 36)]
        }
        return password
    }

    findCompanyById = async (req: Request, res: Response) => {
        let id = +req.params.companyId
        let companyFind = await companyService.findCompanyById(id)
        return res.status(200).json({
            companyFind: companyFind
        })
    }

    getAll = async (req: Request, res: Response) => {
        try {
            let company = await CompanyService.findAll()
            return res.status(200).json({company: company})
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    search = async (req: Request, res: Response) => {
        try {
            let query = req.body.name
            let company = await CompanyService.searchCompany(query)
            return res.status(200).json({company: company})
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    searchTopCompany = async (req: Request, res: Response) => {
        try {
            let topCompany = await CompanyService.searchTopCompanies()
            return res.status(200).json({company: topCompany})
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
}

export default new CompanyController();