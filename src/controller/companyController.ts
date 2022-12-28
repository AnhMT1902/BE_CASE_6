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
            let company = req.body
            company.password = '12345678'
            let companyFind = await CompanyService.registerCompany(company);
            if (companyFind.checkRegister) {
                return this.sendMailForCompany(req, res, company.password, company.email, companyFind);
            } else return res.status(200).json(companyFind)
        } catch (e) {
            console.log(e)
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

        const template = templateLib.config('mails/register.txt',{
            title: 'Chúc mừng bạn đã dăng ký thành công',
            password: `Mật khẩu của bạn là ${password}`,
            action: 'Ngay bây giờ bạn có thể đăng nhập',
            url: 'http://localhost:3000/work/login'
        });

        const viewMail = template.getTemplate();
        console.log(viewMail);
        let transporter = nodemailer.createTransport({ // config mail server
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'find.jobc07@gmail.com', //Tài khoản gmail vừa tạo
                pass: 'minhanh2002' //Mật khẩu tài khoản gmail vừa tạo
            }
        });
        let content = '';
        content += `
        
    `;
        let mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'NQH-Test nodemailer',
            to: `${email}`,
            subject: 'Test Nodemailer',
            text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
            html: content //Nội dung html mình đã tạo trên kia :))
        }
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
                res.status(200).json({
                    message: `mess, Lỗi gửi mail:  + ${err}`
                })
            } else {
                console.log('Message sent: ' + info.response);
                //Gửi thông báo đến người dùng
                res.status(200).json(companyFind)

            }
        });
    }
}


export default new CompanyController();