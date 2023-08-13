import  JWT  from "jsonwebtoken";
import { CreateLoginDTO } from "../dtos/CreateLoginDto";
import { makeError } from "../../../../utils/error-handle";
import { Crypt } from "../../../../utils/crypt";
import { UserRepository } from "../../repositories/UserRepository";

class AuthService {
    constructor(private userRepository: UserRepository) {}

    async login(body: CreateLoginDTO) {
        const userAlreadyExists = await this.userRepository.findByEmail(body.email)

        if(!userAlreadyExists) {
            console.log("Usuário não encontrado");
            return makeError("e-mail incorreto", 400)
        }

        const passwordIsValid = Crypt.compare(
            body.password,
            userAlreadyExists.password
        );

        if (!passwordIsValid) {
            return makeError("Senha inválida", 400)
        }
        const payload = {
            id: userAlreadyExists.id,
            email: userAlreadyExists.email
        }

        const secret = process.env.JWT_SECRET_KEY as string;

        const option = { expiresIn: "1h" };

        const key = JWT.sign(payload, secret, option)

        return { key, user: userAlreadyExists }
    }
}

export { AuthService }