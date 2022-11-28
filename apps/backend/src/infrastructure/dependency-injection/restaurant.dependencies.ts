import { CreateRestaurantUsecase } from '@application/use-cases/restaurant/create-restaurant.usecase'
import { DeleteRestaurantUsecase } from '@application/use-cases/restaurant/delete-restaurant.usecase'
import { EditRestaurantUsecase } from '@application/use-cases/restaurant/edit-restaurant.usecase'
import { GetRestaurantsByOwnerUsecase } from '@application/use-cases/restaurant/get-restaurants-by-owner.usecase'
import { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { CreateRestaurantController } from '@infrastructure/controllers/restaurant/create-restaurant.controller'
import { DeleteRestaurantController } from '@infrastructure/controllers/restaurant/delete-restaurant.controller'
import { EditRestaurantController } from '@infrastructure/controllers/restaurant/edit-restaurant.controller'
import { GetRestaurantsByOwnerController } from '@infrastructure/controllers/restaurant/get-restaurants-by-owner.controller'
import { InMemoryRestaurantRepository } from '@infrastructure/repositories/inmemory-restaurant.repository'
import { Container } from 'inversify'

import { ContainerSymbols } from './symbols'

export function defineRestaurantDependencies(container: Container) {
  // Repositories
  container
    .bind<RestaurantRepository>(ContainerSymbols.RestaurantRepository)
    .to(InMemoryRestaurantRepository)

  // Use Cases
  container
    .bind<CreateRestaurantUsecase>(ContainerSymbols.CreateRestaurantUsecase)
    .to(CreateRestaurantUsecase)

  container
    .bind<DeleteRestaurantUsecase>(ContainerSymbols.DeleteRestaurantUsecase)
    .to(DeleteRestaurantUsecase)

  container
    .bind<EditRestaurantUsecase>(ContainerSymbols.EditRestaurantUsecase)
    .to(EditRestaurantUsecase)

  container
    .bind<GetRestaurantsByOwnerUsecase>(ContainerSymbols.GetRestaurantsByOwnerUsecase)
    .to(GetRestaurantsByOwnerUsecase)

  // Controllers
  container
    .bind<CreateRestaurantController>(ContainerSymbols.CreateRestaurantController)
    .to(CreateRestaurantController)

  container
    .bind<DeleteRestaurantController>(ContainerSymbols.DeleteRestaurantController)
    .to(DeleteRestaurantController)

  container
    .bind<EditRestaurantController>(ContainerSymbols.EditRestaurantController)
    .to(EditRestaurantController)

  container
    .bind<GetRestaurantsByOwnerController>(ContainerSymbols.GetRestaurantsByOwnerController)
    .to(GetRestaurantsByOwnerController)
}
