import { CreateCategoryUsecase } from '@application/use-cases/category/create-category.usecase'
import { CheckRestaurantOwnerUsecase } from '@application/use-cases/restaurant/check-restaurant-owner.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { CreateCategoryDTO } from '@infrastructure/dtos/category/create-category.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class CreateCategoryController implements Controller {
  constructor(
    @inject(ContainerSymbols.CreateCategoryUsecase)
    private readonly createCategoryUsecase: CreateCategoryUsecase,
    @inject(ContainerSymbols.CheckRestaurantOwnerUsecase)
    private readonly checkRestaurantOwnerUsecase: CheckRestaurantOwnerUsecase
  ) {}

  async run(
    req: TypedRequestBody<CreateCategoryDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.userId as string
    const { id, name, description, image, restaurantId } = req.body

    try {
      await this.checkRestaurantOwnerUsecase.run({ restaurantId, ownerId: userId })
      await this.createCategoryUsecase.run({
        id,
        name,
        description,
        image,
        restaurantId,
        ownerId: userId,
      })

      res.status(StatusCodes.CREATED).send()
    } catch (error) {
      next(error)
    }
  }
}
