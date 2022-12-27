import {AppDataSource} from "../data-source";
import {User} from "../model/user";
import bcrypt from "bcrypt"

class UserService {
    private userRepository: any

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    findUserByUsername = async (username) => {
        let sql = `select *
                   from company
                   where email = '${username}'`
        return await this.userRepository.query(sql);
    }

    registerUser = async (user) => {
        let userFind = await this.findUserByUsername(user.username)
        if (userFind.length !== 0) {
            return {
                message: "email has been used"
            }
        } else {
            user.password = await bcrypt.hash(user.password, 10);
            return this.userRepository.save(user)
        }
    }
}

export default new UserService()