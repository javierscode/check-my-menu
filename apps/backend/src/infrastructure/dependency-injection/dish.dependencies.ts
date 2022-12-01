import { CheckDishOwnerUsecase } from '@application/use-cases/dish/check-dish-owner.usecase'
import { CreateDishUsecase } from '@application/use-cases/dish/create-dish.usecase'
import { DeleteDishUsecase } from '@application/use-cases/dish/delete-dish.usecase'
import { EditDishUsecase } from '@application/use-cases/dish/edit-dish.usecase'
import { GetDishesByCategoryUsecase } from '@application/use-cases/dish/get-dishes-by-category.usecase'
import { DishRepository } from '@domain/repositories/dish.repository'
import { CreateDishController } from '@infrastructure/controllers/dish/create-dish.controller'
import { DeleteDishController } from '@infrastructure/controllers/dish/delete-dish.controller'
import { EditDishController } from '@infrastructure/controllers/dish/edit-dish.controller'
import { GetDishesByCategoryController } from '@infrastructure/controllers/dish/get-dishes-by-category.controller'
import { InMemoryDishRepository } from '@infrastructure/repositories/inmemory-dish.repository'
import { Container } from 'inversify'

import { ContainerSymbols } from './symbols'

export function defineDishDependencies(container: Container) {
  // Repositories
  container.bind<DishRepository>(ContainerSymbols.DishRepository).to(InMemoryDishRepository)

  // Use Cases
  container.bind<CreateDishUsecase>(ContainerSymbols.CreateDishUsecase).to(CreateDishUsecase)

  container.bind<DeleteDishUsecase>(ContainerSymbols.DeleteDishUsecase).to(DeleteDishUsecase)

  container.bind<EditDishUsecase>(ContainerSymbols.EditDishUsecase).to(EditDishUsecase)

  container
    .bind<GetDishesByCategoryUsecase>(ContainerSymbols.GetDishesByCategoryUsecase)
    .to(GetDishesByCategoryUsecase)

  container
    .bind<CheckDishOwnerUsecase>(ContainerSymbols.CheckDishOwnerUsecase)
    .to(CheckDishOwnerUsecase)

  // Controllers
  container
    .bind<CreateDishController>(ContainerSymbols.CreateDishController)
    .to(CreateDishController)

  container
    .bind<DeleteDishController>(ContainerSymbols.DeleteDishController)
    .to(DeleteDishController)

  container.bind<EditDishController>(ContainerSymbols.EditDishController).to(EditDishController)

  container
    .bind<GetDishesByCategoryController>(ContainerSymbols.GetDishesByCategoryController)
    .to(GetDishesByCategoryController)
}
