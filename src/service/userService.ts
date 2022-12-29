import {AppDataSource} from "../data-source";
import {User} from "../model/user";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

class UserService {
    private userRepository: any

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    loginUser = async (user) => {
        let userFind = (await this.findUserByEmail(user.email));
        if (userFind.length === 0) {
            return {
                message: "Incorrect login information"
            }
        } else {
            let comparePassword = await bcrypt.compare(user.password, userFind[0].password)
            if (!comparePassword) {
                return {
                    message: "Incorrect login information"
                }
            } else {
                let payload = {
                    id: userFind[0].companyId,
                }
                let secret = 'job';
                let token = jwt.sign(payload, secret, {
                    expiresIn: 36000
                })
                return {
                    token: token,
                    user: userFind[0]
                }
            }
        }
    }

    findUserByEmail = async (email) => {
        let sql = `select *
                   from user
                   where email = '${email}'`
        return await this.userRepository.query(sql);
    }

    registerUser = async (user) => {
        let userFind = await this.findUserByEmail(user.email)
        if (userFind.length !== 0) {
            return {
                message: "email has been used",
                checkRegister: false
            }
        } else {
            user.password = await bcrypt.hash(user.password, 10);
            this.userRepository.save(user)
            return {
                message: "register success",
                checkRegister: true

            }

        }
    }
}

export default new UserService()