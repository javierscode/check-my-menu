/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CreateRestaurantController } from '@infrastructure/controllers/restaurant/create-restaurant.controller'
import { DeleteRestaurantController } from '@infrastructure/controllers/restaurant/delete-restaurant.controller'
import { EditRestaurantController } from '@infrastructure/controllers/restaurant/edit-restaurant.controller'
import { GetRestaurantsByOwnerController } from '@infrastructure/controllers/restaurant/get-restaurants-by-owner.controller'
import { myContainer } from '@infrastructure/dependency-injection/container'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { CreateRestaurantSchema } from '@infrastructure/dtos/restaurant/create-restaurant.dto'
import { DeleteRestaurantSchema } from '@infrastructure/dtos/restaurant/delete-restaurant.dto'
import { EditRestaurantSchema } from '@infrastructure/dtos/restaurant/edit-restaurant.dto'
import { Router } from 'express'
import { Validator } from 'express-json-validator-middleware'

const createRestaurantController = myContainer.get<CreateRestaurantController>(
  ContainerSymbols.CreateRestaurantController
)
const deleteRestaurantController = myContainer.get<DeleteRestaurantController>(
  ContainerSymbols.DeleteRestaurantController
)
const editRestaurantController = myContainer.get<EditRestaurantController>(
  ContainerSymbols.EditRestaurantController
)
const getRestaurantsByOwnerController = myContainer.get<GetRestaurantsByOwnerController>(
  ContainerSymbols.GetRestaurantsByOwnerController
)

const RestaurantRoutes = Router()
const validator = new Validator({ allErrors: true })

RestaurantRoutes.post(
  '/',
  validator.validate({ body: CreateRestaurantSchema }),
  createRestaurantController.run.bind(createRestaurantController)
)

RestaurantRoutes.delete(
  '/:id',
  validator.validate({ params: DeleteRestaurantSchema }),
  deleteRestaurantController.run.bind(deleteRestaurantController)
)

RestaurantRoutes.put(
  '/',
  validator.validate({ body: EditRestaurantSchema }),
  editRestaurantController.run.bind(editRestaurantController)
)

RestaurantRoutes.get('/', getRestaurantsByOwnerController.run.bind(getRestaurantsByOwnerController))

export default RestaurantRoutes
