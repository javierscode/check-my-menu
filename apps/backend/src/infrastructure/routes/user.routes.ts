/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import type { GetUserProfileController } from '@infrastructure/controllers/user/get-user-profile.controller'
import type { UserLoginController } from '@infrastructure/controllers/user/user-login.controller'
import type { UserRegisterController } from '@infrastructure/controllers/user/user-register.controller'
import { myContainer } from '@infrastructure/dependency-injection/container'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { UserLoginSchema } from '@infrastructure/dtos/user/user-login.dto'
import { UserRegisterSchema } from '@infrastructure/dtos/user/user-register.dto'
import { UserTokenSchema } from '@infrastructure/dtos/user/user-token.dto'
import { Router } from 'express'
import { Validator } from 'express-json-validator-middleware'

const getUserProfileController = myContainer.get<GetUserProfileController>(
  ContainerSymbols.GetUserProfileController
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
  getUserProfileController.run.bind(getUserProfileController)
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
