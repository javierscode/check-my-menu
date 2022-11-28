import { CheckUserExistenceUsecase } from '@application/use-cases/user/check-user-existence.usecase'
import { GetUserProfileUsecase } from '@application/use-cases/user/get-user-profile.usecase'
import { UserLoginUsecase } from '@application/use-cases/user/user-login.usecase'
import { UserRegisterUsecase } from '@application/use-cases/user/user-register.usecase'
import { UserRepository } from '@domain/repositories/user.repository'
import { GetUserProfileController } from '@infrastructure/controllers/user/get-user-profile.controller'
import { UserLoginController } from '@infrastructure/controllers/user/user-login.controller'
import { UserRegisterController } from '@infrastructure/controllers/user/user-register.controller'
import { InMemoryUserRepository } from '@infrastructure/repositories/inmemory-user.repository'
import { Container } from 'inversify'

import { ContainerSymbols } from './symbols'

export function defineUserDependencies(container: Container) {
  // Repositories
  container.bind<UserRepository>(ContainerSymbols.UserRepository).to(InMemoryUserRepository)

  // Use Cases
  container
    .bind<GetUserProfileUsecase>(ContainerSymbols.GetUserProfileUsecase)
    .to(GetUserProfileUsecase)
  container.bind<UserLoginUsecase>(ContainerSymbols.UserLoginUsecase).to(UserLoginUsecase)
  container.bind<UserRegisterUsecase>(ContainerSymbols.UserRegisterUsecase).to(UserRegisterUsecase)
  container
    .bind<CheckUserExistenceUsecase>(ContainerSymbols.CheckUserExistenceUsecase)
    .to(CheckUserExistenceUsecase)

  // Controllers
  container
    .bind<GetUserProfileController>(ContainerSymbols.GetUserProfileController)
    .to(GetUserProfileController)
  container.bind<UserLoginController>(ContainerSymbols.UserLoginController).to(UserLoginController)
  container
    .bind<UserRegisterController>(ContainerSymbols.UserRegisterController)
    .to(UserRegisterController)
}
