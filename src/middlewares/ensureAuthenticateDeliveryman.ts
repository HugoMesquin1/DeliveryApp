import { NextFunction, Request, Response } from "express";
import {verify} from "jsonwebtoken"

interface IPayload{
    sub: string
}


export async function ensureAuthenticateDeliveryman(
    request: Request, 
    response: Response, 
    next: NextFunction
    ) {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        return response.status(401).json({
            message: "Token missing"
        })
    }

    // [] Bearer, [] Token
    const [, token ] = authHeader.split(" ")

    // token, e secret key

    try {
       const { sub } = verify(token, "dfba5bd3e74a39f06258cb753bc59d8a" ) as IPayload

       request.id_deliveryman = sub

       console.log(sub)

       return next()
       
    } catch (err) {
        return response.status(401).json({
            message: "Invalid token"
        })
    }

    
}
    
