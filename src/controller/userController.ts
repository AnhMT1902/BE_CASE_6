import {Request, Response} from "express";
import userService from "../service/userService";
import nodemailer from "nodemailer"

class UserController {
    registerUser = async (req: Request, res: Response) => {
        try {
            let user = req.body
            let userFind = await userService.registerUser(user);
            await this.sendMailForUser
            return res.status(200).json(userFind)
        } catch (e) {
            console.log(e.message)
        }
    }
    loginUser = async (req: Request, res: Response) => {
        try {
            let user = req.body
            let userFind = await userService.loginUser(user)
            return res.status(200).json(userFind)
        } catch (e) {
            console.log(e.message)
        }
    }
    sendMailForUser = async (req, res, password, email) => {
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
            subject: `Xin chào ${email}`,
            text: `bạn đã đăng ký thành công`,//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        }
        await transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(`mess, Lỗi gửi mail:  + ${err}`)
            } else {
                console.log('Message sent: ' + info.response)
            }
        });
    }
}

export default new UserController();