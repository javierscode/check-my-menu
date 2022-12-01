import type { CheckDishOwnerUsecase } from '@application/use-cases/dish/check-dish-owner.usecase'
import type { DeleteDishUsecase } from '@application/use-cases/dish/delete-dish.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { DeleteDishDTO } from '@infrastructure/dtos/dish/delete-dish.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestParams } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class DeleteDishController implements Controller {
  constructor(
    @inject(ContainerSymbols.DeleteDishUsecase)
    private readonly deleteDishUsecase: DeleteDishUsecase,
    @inject(ContainerSymbols.CheckDishOwnerUsecase)
    private readonly checkDishOwnerUsecase: CheckDishOwnerUsecase
  ) {}

  async run(
    req: TypedRequestParams<DeleteDishDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.userId as string
    const { id } = req.params

    try {
      await this.checkDishOwnerUsecase.run({ dishId: id, ownerId: userId })
      await this.deleteDishUsecase.run({ id })

      res.status(StatusCodes.OK).send()
    } catch (error) {
      next(error)
    }
  }
}
