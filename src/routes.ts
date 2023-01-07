import {Router} from "express"
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient"
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman"
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController"
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController"
import { CreateClientController } from "./modules/clients/UseCases/createClient/CreateClientController"
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController"
import { FindAllAvailableController } from "./modules/deliveries/useCases/FindAllAvailable/FindAllAvailableController"
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/UpdateDeliveryman/UpdateDeliverymanController"
import { CreateDeliveryManController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController"

const routes = Router()


const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()

const createDeliveryManController = new CreateDeliveryManController()
const authenthicateDeliverymanController = new AuthenticateDeliverymanController()

const deliveryController = new CreateDeliveryController()

const findAllAvailableController = new FindAllAvailableController()
const updateDeliverymanController = new UpdateDeliverymanController



routes.post("/client/", createClientController.handle )

routes.post("/client/authenticate/", authenticateClientController.handle )

routes.post("/deliveryman/authenticate/", authenthicateDeliverymanController.handle )

routes.post("/deliveryman", createDeliveryManController.handle)

routes.post("/delivery", ensureAuthenticateClient, deliveryController.handle)

routes.get("/delivery/available", ensureAuthenticateDeliveryman,  findAllAvailableController.handle)

routes.put("/delivery/updateDeliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle)


export { routes }