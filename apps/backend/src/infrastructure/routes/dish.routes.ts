/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { CreateDishController } from '@infrastructure/controllers/dish/create-dish.controller'
import type { DeleteDishController } from '@infrastructure/controllers/dish/delete-dish.controller'
import type { EditDishController } from '@infrastructure/controllers/dish/edit-dish.controller'
import type { GetDishesByCategoryController } from '@infrastructure/controllers/dish/get-dishes-by-category.controller'
import { GetDishesByRestaurantController } from '@infrastructure/controllers/dish/get-dishes-by-restaurant.controller'
import { myContainer } from '@infrastructure/dependency-injection/container'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { CreateDishSchema } from '@infrastructure/dtos/dish/create-dish.dto'
import { DeleteDishSchema } from '@infrastructure/dtos/dish/delete-dish.dto'
import { EditDishSchema } from '@infrastructure/dtos/dish/edit-dish.dto'
import { GetDishesDTO, GetDishesSchema } from '@infrastructure/dtos/dish/get-dishes.dto'
import { GetDishesByCategoryDTO } from '@infrastructure/dtos/dish/get-dishes-by-category.dto'
import { GetDishesByRestaurantDTO } from '@infrastructure/dtos/dish/get-dishes-by-restaurant.dto'
import { authMiddleware } from '@infrastructure/middlewares/auth.middleware'
import { NextFunction, Response, Router } from 'express'
import { Validator } from 'express-json-validator-middleware'
import { TypedRequestBody } from 'src/types/express'

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
const getDishesByRestaurantController = myContainer.get<GetDishesByRestaurantController>(
  ContainerSymbols.GetDishesByRestaurantController
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
  validator.validate({ body: GetDishesSchema }),
  async (req: TypedRequestBody<GetDishesDTO>, res: Response, next: NextFunction) => {
    if (req.body.categoryId) {
      return getDishesByCategoryController.run(
        req as TypedRequestBody<GetDishesByCategoryDTO>,
        res,
        next
      )
    } else if (req.body.restaurantId) {
      return getDishesByRestaurantController.run(
        req as TypedRequestBody<GetDishesByRestaurantDTO>,
        res,
        next
      )
    }
  }
)

export default DishRoutes
