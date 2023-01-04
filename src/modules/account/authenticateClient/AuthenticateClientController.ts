import { Request, Response } from "express";
import { AuthenticateClientUseCase } from "./AuthenticateClientUserUseCase";

export class AuthenticateClientController {
    async handle(request: Request, response:Response) {
        const {username, password} = request.body

        const authenticateClientusecase = new AuthenticateClientUseCase()
        const result = await authenticateClientusecase.execute({
            username,
            password
        })

        return response.json(result)
    }
}