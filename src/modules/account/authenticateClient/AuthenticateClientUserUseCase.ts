import { prisma } from "../../../database/prismaClient"
import {compare} from "bcrypt"
import { sign } from "jsonwebtoken"



interface IAuthenticateClient {
    username: string
    password: string

}


export class AuthenticateClientUseCase {
    async execute ({username, password}:IAuthenticateClient) { 
        // receber username, password
        
        // Verificar se username cadastrador 
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error ("Username or password invalid.")
        }
        // Verificar se senha corresponde ao username

        const passwordMatch = await compare(password, client.password)

        if(!password) {
            throw new Error ("Username or password invalid.")
        }
        
        // Gerar o token
        const token = sign({username}, "dfba5bd3e74a29f06258cb753bc59d8a", {
            subject: client.id,
            expiresIn: "1d"
        })

        
    }
}