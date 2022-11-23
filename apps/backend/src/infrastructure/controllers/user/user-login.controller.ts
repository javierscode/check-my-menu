import { UserLoginUsecase } from '@application/use-cases/user/user-login.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { UserLoginDTO } from '@infrastructure/dtos/user/user-login.dto'
import { sign } from '@infrastructure/services/jwt.service'
import { StatusCodes } from '@infrastructure/utils/status-code'
import type { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class UserLoginController implements Controller {
  constructor(
    @inject(ContainerSymbols.UserLoginUsecase)
    private userLoginUseCase: UserLoginUsecase
  ) {}

  async run(req: TypedRequestBody<UserLoginDTO>, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body

    try {
      const userId = await this.userLoginUseCase.run({ email, password })

      const payload = { id: userId }
      const token = await sign(payload)

      res.status(StatusCodes.OK).send({ token })
    } catch (error) {
      next(error)
    }
  }
}
