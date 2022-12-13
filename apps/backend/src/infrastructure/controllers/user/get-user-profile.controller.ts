import { GetUserProfileUsecase } from '@application/use-cases/user/get-user-profile.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { StatusCodes } from '@infrastructure/utils/status-code'
import type { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { Controller } from '../controller'

@injectable()
export class GetUserProfileController implements Controller {
  constructor(
    @inject(ContainerSymbols.GetUserProfileUsecase)
    private GetUserProfileUseCase: GetUserProfileUsecase
  ) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.userId as string

    try {
      const profile = await this.GetUserProfileUseCase.run({ id })
      res.status(StatusCodes.OK).send(profile)
    } catch (error) {
      next(error)
    }
  }
}
