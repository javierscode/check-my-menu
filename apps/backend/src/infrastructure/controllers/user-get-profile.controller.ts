import { ApplicationUnauthorizedException } from '@application/exceptions/application-unauthorized.exception'
import { UserGetProfileUsecase } from '@application/use-cases/user-get-profile.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { UserTokenDTO } from '@infrastructure/dtos/user-token.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import type { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from './controller'

@injectable()
export class UserGetProfileController implements Controller {
  constructor(
    @inject(ContainerSymbols.UserGetProfileUsecase)
    private userGetProfileUseCase: UserGetProfileUsecase
  ) {}

  async run(req: TypedRequestBody<UserTokenDTO>, res: Response, next: NextFunction): Promise<void> {
    const id = req.body.id

    try {
      const profile = await this.userGetProfileUseCase.run({ id })
      res.status(StatusCodes.OK).send(profile)
    } catch (error) {
      next(error)
    }
  }
}
