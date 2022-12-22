/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { CreateCategoryController } from '@infrastructure/controllers/category/create-category.controller'
import type { DeleteCategoryController } from '@infrastructure/controllers/category/delete-category.controller'
import type { EditCategoryController } from '@infrastructure/controllers/category/edit-category.controller'
import type { GetCategoriesByRestaurantController } from '@infrastructure/controllers/category/get-categories-by-restaurant.controller'
import { GetCategoryByIdController } from '@infrastructure/controllers/category/get-category-by-id.controller'
import { myContainer } from '@infrastructure/dependency-injection/container'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { CreateCategorySchema } from '@infrastructure/dtos/category/create-category.dto'
import { DeleteCategorySchema } from '@infrastructure/dtos/category/delete-category.dto'
import { EditCategorySchema } from '@infrastructure/dtos/category/edit-category.dto'
import { GetCategoriesByRestaurantSchema } from '@infrastructure/dtos/category/get-categories-by-restaurant.dto'
import { GetCategoryByIdSchema } from '@infrastructure/dtos/category/get-category-by-id.dto'
import { authMiddleware } from '@infrastructure/middlewares/auth.middleware'
import { Router } from 'express'
import { Validator } from 'express-json-validator-middleware'

const createCategoryController = myContainer.get<CreateCategoryController>(
  ContainerSymbols.CreateCategoryController
)
const deleteCategoryController = myContainer.get<DeleteCategoryController>(
  ContainerSymbols.DeleteCategoryController
)
const editCategoryController = myContainer.get<EditCategoryController>(
  ContainerSymbols.EditCategoryController
)
const getCategoriesByRestaurantController = myContainer.get<GetCategoriesByRestaurantController>(
  ContainerSymbols.GetCategoriesByRestaurantController
)
const getCategoryByIdController = myContainer.get<GetCategoryByIdController>(
  ContainerSymbols.GetCategoryByIdController
)

const CategoryRoutes = Router()
const validator = new Validator({ allErrors: true })

CategoryRoutes.post(
  '/',
  authMiddleware,
  validator.validate({ body: CreateCategorySchema }),
  createCategoryController.run.bind(createCategoryController)
)

CategoryRoutes.delete(
  '/:id',
  authMiddleware,
  validator.validate({ params: DeleteCategorySchema }),
  deleteCategoryController.run.bind(deleteCategoryController)
)

CategoryRoutes.put(
  '/',
  authMiddleware,
  validator.validate({ body: EditCategorySchema }),
  editCategoryController.run.bind(editCategoryController)
)

CategoryRoutes.get(
  '/restaurantId/:restaurantId',
  validator.validate({ params: GetCategoriesByRestaurantSchema }),
  getCategoriesByRestaurantController.run.bind(getCategoriesByRestaurantController)
)

CategoryRoutes.get(
  '/:id',
  validator.validate({ params: GetCategoryByIdSchema }),
  getCategoryByIdController.run.bind(getCategoryByIdController)
)

export default CategoryRoutes
