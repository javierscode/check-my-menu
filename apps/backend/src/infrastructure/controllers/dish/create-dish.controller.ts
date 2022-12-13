import type { CheckCategoryOwnerUsecase } from '@application/use-cases/category/check-category-owner.usecase'
import type { CreateDishUsecase } from '@application/use-cases/dish/create-dish.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { CreateDishDTO } from '@infrastructure/dtos/dish/create-dish.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class CreateDishController implements Controller {
  constructor(
    @inject(ContainerSymbols.CreateDishUsecase)
    private readonly createDishUsecase: CreateDishUsecase,
    @inject(ContainerSymbols.CheckCategoryOwnerUsecase)
    private readonly checkCategoryOwnerUsecase: CheckCategoryOwnerUsecase
  ) {}

  async run(
    req: TypedRequestBody<CreateDishDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.userId as string
    const { id, name, description, image, price, allergens, categoryIds, restaurantId } = req.body

    try {
      await Promise.all(
        categoryIds.map(categoryId =>
          this.checkCategoryOwnerUsecase.run({ categoryId, ownerId: userId })
        )
      )
      await this.createDishUsecase.run({
        id,
        name,
        description,
        image,
        price,
        allergens,
        categoryIds,
        restaurantId,
        ownerId: userId,
      })

      res.status(StatusCodes.CREATED).send()
    } catch (error) {
      next(error)
    }
  }
}
