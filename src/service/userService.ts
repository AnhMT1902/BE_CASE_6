import {AppDataSource} from "../data-source";
import {User} from "../model/user";

class UserService {
    private userRepository: any

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }
}