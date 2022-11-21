import { UserLoginUsecase } from '@application/use-cases/user-login.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { UserLoginDTO } from '@infrastructure/dtos/user-login.dto'
import { sign } from '@infrastructure/services/jwt.service'
import type { Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from './controller'

@injectable()
export class UserLoginController implements Controller {
  constructor(
    @inject(ContainerSymbols.UserLoginUsecase)
    private userLoginUseCase: UserLoginUsecase
  ) {}

  async run(req: TypedRequestBody<UserLoginDTO>, res: Response): Promise<void> {
    const { email, password } = req.body
    const userId = await this.userLoginUseCase.run({ email, password })

    const payload = { id: userId }
    const token = await sign(payload)

    res.send({ token })
  }
}
