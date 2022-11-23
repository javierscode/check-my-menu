import { GetUserProfileUsecase } from '@application/use-cases/user/get-user-profile.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { UserTokenDTO } from '@infrastructure/dtos/user/user-token.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import type { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class GetUserProfileController implements Controller {
  constructor(
    @inject(ContainerSymbols.GetUserProfileUsecase)
    private GetUserProfileUseCase: GetUserProfileUsecase
  ) {}

  async run(req: TypedRequestBody<UserTokenDTO>, res: Response, next: NextFunction): Promise<void> {
    const id = req.body.id

    try {
      const profile = await this.GetUserProfileUseCase.run({ id })
      res.status(StatusCodes.OK).send(profile)
    } catch (error) {
      next(error)
    }
  }
}
