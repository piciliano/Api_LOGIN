import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt"

class UserService {
    constructor(private repository: UserRepository) {}

    async create(user: CreateUserDTO) {
        try {
            const userEmail = await this.repository.findByEmail(user.email)
            if(userEmail) {
                return { error: true, message: "Email já existe", status: 400 }
            }

            const payload = {
                ...user,
                password: bcrypt.hashSync(user.password, 5)
            };

            const createdUser = await this.repository.create(payload);
            return { data: createdUser, message: "Usuário criado!", status: 201 };
        } catch (error: unknown) {
            return  {error: true, message: "Internal server error", status: 500 };
        }
    }
}

export { UserService }