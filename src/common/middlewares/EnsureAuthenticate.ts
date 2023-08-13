import { NextFunction, Request, Response } from "express"
import JWT from "jsonwebtoken"

interface AuthentcaredRequest extends Request {
    userId?: string
}

class EnsureAuthenticate {
    static async execute (
        req: AuthentcaredRequest,
        res: Response,
        next: NextFunction
    ) {
        const { authorization = null } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: "Token not found" });
        }

        const [, token ] = authorization.split(" ");

        try {
            const decodedToken = JWT.verify(
                token,
                process.env.JWT_SECRET_KEY as string
            );

            const userId = ( decodedToken as { id: string}).id;

            if(req.params.id && req.params.id !== userId) {
                return res.status(401).json({error: "Não autorizado"})
            }

            req.userId = userId;

            next()

        } catch (error: unknown) {
            return res.status(401).json({error: "token inválido!"})
        }
    }
}

export { EnsureAuthenticate }