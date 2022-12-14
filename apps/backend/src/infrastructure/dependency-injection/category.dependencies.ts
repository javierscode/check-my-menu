import { CheckCategoryOfRestaurantUsecase } from '@application/use-cases/category/check-category-of-restaurant.usecase'
import { CheckCategoryOwnerUsecase } from '@application/use-cases/category/check-category-owner.usecase'
import { CreateCategoryUsecase } from '@application/use-cases/category/create-category.usecase'
import { DeleteCategoryUsecase } from '@application/use-cases/category/delete-category.usecase'
import { EditCategoryUsecase } from '@application/use-cases/category/edit-category.usecase'
import { GetCategoriesByRestaurantUsecase } from '@application/use-cases/category/get-categories-by-restaurant.usecase'
import { GetCategoryByIdUsecase } from '@application/use-cases/category/get-category-by-id.usecase'
import { CategoryRepository } from '@domain/repositories/category.repository'
import { CreateCategoryController } from '@infrastructure/controllers/category/create-category.controller'
import { DeleteCategoryController } from '@infrastructure/controllers/category/delete-category.controller'
import { EditCategoryController } from '@infrastructure/controllers/category/edit-category.controller'
import { GetCategoriesByRestaurantController } from '@infrastructure/controllers/category/get-categories-by-restaurant.controller'
import { GetCategoryByIdController } from '@infrastructure/controllers/category/get-category-by-id.controller'
import { PostgreSQLCategoryRepository } from '@infrastructure/persistence/repositories/postgresql/postgresql-category.repository'
import { Container } from 'inversify'

import { ContainerSymbols } from './symbols'

export function defineCategoryDependencies(container: Container) {
  // Repositories
  container
    .bind<CategoryRepository>(ContainerSymbols.CategoryRepository)
    .to(PostgreSQLCategoryRepository)

  // Use Cases
  container
    .bind<CreateCategoryUsecase>(ContainerSymbols.CreateCategoryUsecase)
    .to(CreateCategoryUsecase)

  container
    .bind<DeleteCategoryUsecase>(ContainerSymbols.DeleteCategoryUsecase)
    .to(DeleteCategoryUsecase)

  container.bind<EditCategoryUsecase>(ContainerSymbols.EditCategoryUsecase).to(EditCategoryUsecase)

  container
    .bind<GetCategoriesByRestaurantUsecase>(ContainerSymbols.GetCategoriesByRestaurantUsecase)
    .to(GetCategoriesByRestaurantUsecase)

  container
    .bind<GetCategoryByIdUsecase>(ContainerSymbols.GetCategoryByIdUsecase)
    .to(GetCategoryByIdUsecase)

  container
    .bind<CheckCategoryOwnerUsecase>(ContainerSymbols.CheckCategoryOwnerUsecase)
    .to(CheckCategoryOwnerUsecase)

  container
    .bind<CheckCategoryOfRestaurantUsecase>(ContainerSymbols.CheckCategoryOfRestaurantUsecase)
    .to(CheckCategoryOfRestaurantUsecase)

  // Controllers
  container
    .bind<CreateCategoryController>(ContainerSymbols.CreateCategoryController)
    .to(CreateCategoryController)

  container
    .bind<DeleteCategoryController>(ContainerSymbols.DeleteCategoryController)
    .to(DeleteCategoryController)

  container
    .bind<EditCategoryController>(ContainerSymbols.EditCategoryController)
    .to(EditCategoryController)

  container
    .bind<GetCategoriesByRestaurantController>(ContainerSymbols.GetCategoriesByRestaurantController)
    .to(GetCategoriesByRestaurantController)

  container
    .bind<GetCategoryByIdController>(ContainerSymbols.GetCategoryByIdController)
    .to(GetCategoryByIdController)
}
