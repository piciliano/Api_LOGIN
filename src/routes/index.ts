import { Router } from "express";
import { UserModule } from "../app/users/UserModule";
import { EnsureAuthenticate } from "../common/middlewares/EnsureAuthenticate";
import { AuthModule } from "../app/users/auth/AuthModule";

const userController = UserModule.build().controller;
const authController = AuthModule.build().controller;

const router = Router()

router.post("/project", userController.create.bind(userController)) 
router.post("/auth", authController.login.bind(authController))

export { router }