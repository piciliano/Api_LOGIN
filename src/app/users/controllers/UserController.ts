import { makeCreateUserSchema } from "../schemas/CreateUserSchema";
import { UserService } from "../services/UserService";
import { Request, Response } from "express";

class UserController {
  constructor(private service: UserService) {}

  async create(req: Request, res: Response) {
    const { body } = req;

    try {
      await makeCreateUserSchema().validate(body);
    } catch (error) {
      return res.status(400).json({
        errors: (error as Error).message,
      });
    }
    const result = await this.service.create(body);
    if(result && "error" in result) {
        return res.status(result.status).json(result)
    }
    return res.status(201).json(result)
  }
}

export { UserController }
