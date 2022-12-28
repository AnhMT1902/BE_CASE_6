import {Request, Response} from "express";
import CompanyService from "../service/companyService";
import {Company} from "../model/company";
import nodemailer from 'nodemailer';
import templateLib from "../libs/TemplateLib";
import fs from "fs";
import path from "path";

class CompanyController {

    loginCompany = async (req: Request, res: Response) => {
        try {
            let company = req.body
            let companyFind = await CompanyService.loginCompany(company);
            return res.status(200).json(companyFind)
        } catch (e) {
            console.log(e.message)
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
            console.log(e)
        }
    }

    randomPassword = async () => {
        let str = `qwertyuiopasdfghjklzxcvbnm1234567890`
        let password = ''
        for (let i = Math.floor(Math.random() * str.length - 1); i <= str.length; i = Math.floor(Math.random() * str.length - 1)) {
            if (password.length >= 8) {
                return password
            } else {
                password += str[i]
            }
        }
    }

    updateCompany = async (req: Request, res: Response) => {
        try {
            let companyEdit = req.body
            companyEdit.companyId = +req.params.companyId
            let companyFind = await CompanyService.updateCompany(companyEdit);
            return res.status(200).json(companyFind)
        } catch (e) {
            console.log(e)
        }
    }
    sendMailForCompany = (req, res, password, email, companyFind) => {
        let transporter = nodemailer.createTransport({ // config mail server
            service: 'gmail',
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: 'cskh@ieltsmentor.edu.vn', //Tài khoản gmail vừa tạo
                pass: 'Ieltsmentor@123' //Mật khẩu tài khoản gmail vừa tạo
            }
        });
        let mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'find.jobc07@gmail.com',
            to: `${email}`,
            subject: 'Xin chào',
            text: `mật khẩu đăng nhập của bạn là ${password}`,//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
            // html: content //Nội dung html mình đã tạo trên kia :))
        }
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
                res.status(200).json({
                    message: `mess, Lỗi gửi mail:  + ${err}`
                })
            } else {
                companyFind.email = 'Message sent: ' + info.response
                //Gửi thông báo đến người dùng
                res.status(200).json(companyFind)

            }
        });
    }
}


export default new CompanyController();