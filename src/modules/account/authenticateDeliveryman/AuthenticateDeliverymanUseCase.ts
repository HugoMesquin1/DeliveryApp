
import { prisma } from "../../../database/prismaClient"
import {compare} from "bcrypt"
import {sign} from "jsonwebtoken"

interface IAuthenticateDeliveryman {
    username: string
    password: string
}


export class AuthenticateDeliverymanUseCase {
    async execute ({ username, password}: IAuthenticateDeliveryman) {
        const DeliveryMan = await prisma.deliveryMan.findFirst({
            where:{
                username,
            }
        })

        if(!DeliveryMan) {
            throw new Error ("Username or password invalid !")
        }

        const passwordMatch = await compare(password, DeliveryMan.password)

        if(!passwordMatch) {
            throw new Error ("Username or password invalid !")
        }


        const token = sign ({username}, "dfba5bd3e74a39f06258cb753bc59d8a", {
            subject: DeliveryMan.id,
            expiresIn: "1d",
          })

        return token
    }
}
            

