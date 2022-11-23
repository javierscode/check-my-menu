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

const myContainer = new Container()

// Repositories
myContainer.bind<UserRepository>(ContainerSymbols.UserRepository).to(InMemoryUserRepository)

// Use Cases
myContainer
  .bind<GetUserProfileUsecase>(ContainerSymbols.GetUserProfileUsecase)
  .to(GetUserProfileUsecase)
myContainer.bind<UserLoginUsecase>(ContainerSymbols.UserLoginUsecase).to(UserLoginUsecase)
myContainer.bind<UserRegisterUsecase>(ContainerSymbols.UserRegisterUsecase).to(UserRegisterUsecase)

// Controllers
myContainer
  .bind<GetUserProfileController>(ContainerSymbols.GetUserProfileController)
  .to(GetUserProfileController)
myContainer.bind<UserLoginController>(ContainerSymbols.UserLoginController).to(UserLoginController)
myContainer
  .bind<UserRegisterController>(ContainerSymbols.UserRegisterController)
  .to(UserRegisterController)

export { myContainer }
