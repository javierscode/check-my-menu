import { UserGetProfileUsecase } from '@application/use-cases/user-get-profile.usecase'
import { UserLoginUsecase } from '@application/use-cases/user-login.usecase'
import { UserRegisterUsecase } from '@application/use-cases/user-register.usecase'
import { UserRepository } from '@domain/repositories/user.repository'
import { UserGetProfileController } from '@infrastructure/controllers/user-get-profile.controller'
import { UserLoginController } from '@infrastructure/controllers/user-login.controller'
import { UserRegisterController } from '@infrastructure/controllers/user-register.controller'
import { InMemoryUserRepository } from '@infrastructure/repositories/inmemory-user.repository'
import { Container } from 'inversify'

import { ContainerSymbols } from './symbols'

const myContainer = new Container()

// Repositories
myContainer.bind<UserRepository>(ContainerSymbols.UserRepository).to(InMemoryUserRepository)

// Use Cases
myContainer
  .bind<UserGetProfileUsecase>(ContainerSymbols.UserGetProfileUsecase)
  .to(UserGetProfileUsecase)
myContainer.bind<UserLoginUsecase>(ContainerSymbols.UserLoginUsecase).to(UserLoginUsecase)
myContainer.bind<UserRegisterUsecase>(ContainerSymbols.UserRegisterUsecase).to(UserRegisterUsecase)

// Controllers
myContainer
  .bind<UserGetProfileController>(ContainerSymbols.UserGetProfileController)
  .to(UserGetProfileController)
myContainer.bind<UserLoginController>(ContainerSymbols.UserLoginController).to(UserLoginController)
myContainer
  .bind<UserRegisterController>(ContainerSymbols.UserRegisterController)
  .to(UserRegisterController)

export { myContainer }
