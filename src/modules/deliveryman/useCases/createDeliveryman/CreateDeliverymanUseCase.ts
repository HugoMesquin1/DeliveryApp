import { hash } from "bcrypt"
import {prisma} from "../../../../database/prismaClient"

interface ICreateDeliveryman{
    username: string
    password: string
}


export class CreateDeliveryManUseCase {
    async execute ({username, password}: ICreateDeliveryman) {
        const deliverymanExists = await prisma.deliveryMan.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })

        if(deliverymanExists) {
            throw new Error("Deliveryman already exists")
        }

        const hashPassword = await hash(password, 10)

        const deliveryman = await prisma.deliveryMan.create({
            data:{
                username,
                password: hashPassword,
            },
        })

        return deliveryman


    }
    
}