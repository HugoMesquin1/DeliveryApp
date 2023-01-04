import { prisma } from "../../../../database/prismaClient"
import {hash} from "bcrypt"

interface ICreateCliente {
    username: string
    password: string
}


export class CreateClientUseCase {
    async execute({password, username}: ICreateCliente){
        // Verificar se o client exist
        const clientExists = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                    
                }
            }
        })

        if(clientExists) {
            throw new Error("Client already exists")
        }

        // criptografar senha
        const hashPassword = await hash(password, 10)

        // salvar o client

        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword
            }
        })

        return client




 }
}