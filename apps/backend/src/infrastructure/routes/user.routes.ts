/* eslint-disable @typescript-eslint/no-misused-promises */
import { UserRegisterUsecase } from '@application/use-cases/user-register.usecase'
import type { UserGetProfileController } from '@infrastructure/controllers/user-get-profile.controller'
import type { UserLoginController } from '@infrastructure/controllers/user-login.controller'
import type { UserRegisterController } from '@infrastructure/controllers/user-register.controller'
import { myContainer } from '@infrastructure/dependency-injection/container'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { Router } from 'express'

const userGetProfileController = myContainer.get<UserGetProfileController>(
  ContainerSymbols.UserGetProfileController
)
const userLoginController = myContainer.get<UserLoginController>(
  ContainerSymbols.UserLoginController
)
const userRegisterController = myContainer.get<UserRegisterController>(
  ContainerSymbols.UserRegisterController
)

const UserRoutes = Router()

UserRoutes.get('/profile', userGetProfileController.run.bind(userGetProfileController))
UserRoutes.post('/login', userLoginController.run.bind(userLoginController))
UserRoutes.post('/register', userRegisterController.run.bind(userRegisterController))

export default UserRoutes
