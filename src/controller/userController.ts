import {Request, Response} from "express";
import userService from "../service/userService";
import nodemailer from "nodemailer"

class UserController {
    registerUser = async (req: Request, res: Response) => {
        try {
            let user = req.body;
            let userFind = await userService.registerUser(user);
            if (userFind.checkRegister) {
                await this.sendMailForUser(req, res, user.email);
            }
            return res.status(200).json(userFind);
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
    loginUser = async (req: Request, res: Response) => {
        try {
            let user = req.body
            let userFind = await userService.loginUser(user)
            return res.status(200).json(userFind)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
    sendMailForUser = async (req, res, email) => {
        let transporter = nodemailer.createTransport({ // config mail server
            service: 'gmail',
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: 'find.jobc07@gmail.com', //Tài khoản gmail vừa tạo
                pass: 'hhzkbpgikhlecmrt' //Mật khẩu tài khoản gmail vừa tạo
            }
        });
        let mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'find.jobc07@gmail.com',
            to: `${email}`,
            subject: `Xin chào ${email}`,
            text: `bạn đã đăng ký thành công`,//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        }
        await transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                return `mess, Lỗi gửi mail:  + ${err}`
            } else {
                return 'Message sent: ' + info.response
            }
        });
    }
}

export default new UserController();