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

    sendMailForCompany = (req, res, password, email, companyFind) => {
        let transporter = nodemailer.createTransport({ // config mail server
            service: 'gmail',
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: 'find.jobc07@gmail.com', //Tài khoản gmail vừa tạo
                pass: 'utrmdjfrigniottr'//Mật khẩu tài khoản gmail vừa tạo
            }
        });
        let mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'find.jobc07@gmail.com',
            to: `${email}`,
            subject: `Xin chào ${email}`,
            text: `mật khẩu đăng nhập của bạn là: "${password}"
            bạn có thể đăng nhập tại http://localhost:3000/work/login
               `//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
            // html: content //Nội dung html mình đã tạo trên kia :))
        }
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                return res.status(200).json({
                    message: `mess, Lỗi gửi mail:  + ${err}`
                })
            } else {
                companyFind.email = 'Message sent: ' + info.response
                //Gửi thông báo đến người dùng
                return res.status(200).json(companyFind)
            }
        });
    }
    randomPassword = async () => {
        let str = `qwpc89vbnerag6h7styu234iodfjklzxm150`
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
        }catch (e){
            res.json({
                mess: e.message
            })
        }
    }
}

export default new CompanyController();