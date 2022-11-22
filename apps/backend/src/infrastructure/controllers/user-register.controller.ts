import { UserRegisterUsecase } from '@application/use-cases/user-register.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { UserRegisterDTO } from '@infrastructure/dtos/user-register.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from './controller'

@injectable()
export class UserRegisterController implements Controller {
  constructor(
    @inject(ContainerSymbols.UserRegisterUsecase)
    private userRegisterUseCase: UserRegisterUsecase
  ) {}

  async run(
    req: TypedRequestBody<UserRegisterDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id, name, lastname, email, password } = req.body

    try {
      await this.userRegisterUseCase.run({ id, name, lastname, email, password })
      res.status(StatusCodes.CREATED).send()
    } catch (error) {
      next(error)
    }
  }
}
