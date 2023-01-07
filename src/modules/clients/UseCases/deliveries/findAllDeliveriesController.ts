import { Request, Response } from "express"
import { FindllDeliveriesUseCase } from "./findAllDeliveriesUseCase"


export class FindAllDeliveriesController {
    async handle(request: Request, response: Response) {
        
        const { id_client } = request
       
        const findAllDeliveriesUseCase = new FindllDeliveriesUseCase()
        const deliveries = await findAllDeliveriesUseCase.execute(id_client)

        return response.json(deliveries)

    }
}