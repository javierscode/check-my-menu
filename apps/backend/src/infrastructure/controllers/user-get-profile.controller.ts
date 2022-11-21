import { UserGetProfileUsecase } from '@application/use-cases/user-get-profile.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { UserTokenDTO } from '@infrastructure/dtos/user-token.dto'
import type { Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from './controller'

@injectable()
export class UserGetProfileController implements Controller {
  constructor(
    @inject(ContainerSymbols.UserGetProfileUsecase)
    private userGetProfileUseCase: UserGetProfileUsecase
  ) {}

  async run(req: TypedRequestBody<UserTokenDTO>, res: Response): Promise<void> {
    const id = req.body.id

    const profile = await this.userGetProfileUseCase.run({ id })

    res.send(profile)
  }
}
