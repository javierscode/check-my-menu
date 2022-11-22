/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import type { UserGetProfileController } from '@infrastructure/controllers/user-get-profile.controller'
import type { UserLoginController } from '@infrastructure/controllers/user-login.controller'
import type { UserRegisterController } from '@infrastructure/controllers/user-register.controller'
import { myContainer } from '@infrastructure/dependency-injection/container'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { UserLoginSchema } from '@infrastructure/dtos/user-login.dto'
import { UserRegisterSchema } from '@infrastructure/dtos/user-register.dto'
import { UserTokenSchema } from '@infrastructure/dtos/user-token.dto'
import { Router } from 'express'
import { Validator } from 'express-json-validator-middleware'

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
const validator = new Validator({ allErrors: true })

UserRoutes.get(
  '/profile',
  validator.validate({ body: UserTokenSchema }),
  userGetProfileController.run.bind(userGetProfileController)
)
UserRoutes.post(
  '/login',
  validator.validate({ body: UserLoginSchema }),
  userLoginController.run.bind(userLoginController)
)
UserRoutes.post(
  '/register',
  validator.validate({ body: UserRegisterSchema }),
  userRegisterController.run.bind(userRegisterController)
)

export default UserRoutes
