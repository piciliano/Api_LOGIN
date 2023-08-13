import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserModel } from "../entities/User";

class UserRepository {
    constructor(private model: typeof UserModel) {}

    async create(user: CreateUserDTO) {
        return this.model.create(user)
    }

    async findByEmail(email: string) {
        return this.model.findOne({ email })
    }
}

export { UserRepository }