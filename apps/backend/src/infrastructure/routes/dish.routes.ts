/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { CreateDishController } from '@infrastructure/controllers/dish/create-dish.controller'
import type { DeleteDishController } from '@infrastructure/controllers/dish/delete-dish.controller'
import type { EditDishController } from '@infrastructure/controllers/dish/edit-dish.controller'
import type { GetDishesByCategoryController } from '@infrastructure/controllers/dish/get-dishes-by-category.controller'
import { myContainer } from '@infrastructure/dependency-injection/container'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { CreateDishSchema } from '@infrastructure/dtos/dish/create-dish.dto'
import { DeleteDishSchema } from '@infrastructure/dtos/dish/delete-dish.dto'
import { EditDishSchema } from '@infrastructure/dtos/dish/edit-dish.dto'
import { GetDishesByCategorySchema } from '@infrastructure/dtos/dish/get-dishes-by-category.dto'
import { authMiddleware } from '@infrastructure/middlewares/auth.middleware'
import { Router } from 'express'
import { Validator } from 'express-json-validator-middleware'

const createDishController = myContainer.get<CreateDishController>(
  ContainerSymbols.CreateDishController
)
const deleteDishController = myContainer.get<DeleteDishController>(
  ContainerSymbols.DeleteDishController
)
const editDishController = myContainer.get<EditDishController>(ContainerSymbols.EditDishController)
const getDishesByCategoryController = myContainer.get<GetDishesByCategoryController>(
  ContainerSymbols.GetDishesByCategoryController
)

const DishRoutes = Router()
const validator = new Validator({ allErrors: true })

DishRoutes.post(
  '/',
  authMiddleware,
  validator.validate({ body: CreateDishSchema }),
  createDishController.run.bind(createDishController)
)

DishRoutes.delete(
  '/:id',
  authMiddleware,
  validator.validate({ params: DeleteDishSchema }),
  deleteDishController.run.bind(deleteDishController)
)

DishRoutes.put(
  '/',
  authMiddleware,
  validator.validate({ body: EditDishSchema }),
  editDishController.run.bind(editDishController)
)

DishRoutes.get(
  '/',
  validator.validate({ body: GetDishesByCategorySchema }),
  getDishesByCategoryController.run.bind(getDishesByCategoryController)
)

export default DishRoutes
