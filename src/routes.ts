import {Router} from "express"
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController"
import { CreateClientController } from "./modules/clients/UseCases/createClient/CreateClientController"
import { CreateDeliveryManController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController"

const routes = Router()


const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()

const createDeliveryManController = new CreateDeliveryManController()


routes.post("/client/", createClientController.handle )

routes.post("/authenticate/", authenticateClientController.handle )

routes.post("/deliveryman", createDeliveryManController.handle)



export { routes }