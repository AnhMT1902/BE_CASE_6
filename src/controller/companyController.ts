import {Request, Response} from "express";
import CompanyService from "../service/companyService";
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
                console.log(err);
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
        console.log(str.length)
        let password = ''
        while (password.length <= 8) {
            password += str[Math.floor(Math.random() * 36)]
        }
        return password
    }
}


export default new CompanyController();