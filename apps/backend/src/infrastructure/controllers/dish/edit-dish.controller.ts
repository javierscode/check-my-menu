import type { CheckDishOwnerUsecase } from '@application/use-cases/dish/check-dish-owner.usecase'
import type { EditDishUsecase } from '@application/use-cases/dish/edit-dish.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { EditDishDTO } from '@infrastructure/dtos/dish/edit-dish.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class EditDishController implements Controller {
  constructor(
    @inject(ContainerSymbols.EditDishUsecase)
    private readonly editDishUsecase: EditDishUsecase,
    @inject(ContainerSymbols.CheckDishOwnerUsecase)
    private readonly checkDishOwnerUsecase: CheckDishOwnerUsecase
  ) {}

  async run(req: TypedRequestBody<EditDishDTO>, res: Response, next: NextFunction): Promise<void> {
    const userId = req.userId as string
    const { id, name, description, image, price, allergens, categoryIds } = req.body

    try {
      await this.checkDishOwnerUsecase.run({ dishId: id, ownerId: userId })
      await this.editDishUsecase.run({
        id,
        name,
        description,
        image,
        price,
        allergens,
        categoryIds,
      })

      res.status(StatusCodes.OK).send()
    } catch (error) {
      next(error)
    }
  }
}
