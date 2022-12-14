import { DishIdAlreadyInUseException } from '@application/exceptions/dish/dish-id-already-in-use.exception'
import { Dish } from '@domain/entities/dish.entity'
import type { DishRepository } from '@domain/repositories/dish.repository'
import { AllergenVO } from '@domain/value-objects/allergen.vo'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { ImageVO } from '@domain/value-objects/image.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { PriceVO } from '@domain/value-objects/price.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export interface CreateDishRequest {
  id: string
  name: string
  description: string
  image: string
  price: number
  allergens: string[]
  categoryIds: string[]
  restaurantId: string
  ownerId: string
}

@injectable()
export class CreateDishUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.DishRepository)
    private readonly dishRepository: DishRepository
  ) {}

  async run({
    id,
    name,
    description,
    image,
    price,
    allergens,
    categoryIds,
    restaurantId,
    ownerId,
  }: CreateDishRequest): Promise<void> {
    const Id = new UuidVO(id)
    const Name = new NameVO(name)
    const Description = new DescriptionVO(description)
    const Image = new ImageVO(image)
    const Price = new PriceVO(price)
    const Allergens = allergens.map(allergen => new AllergenVO(allergen))
    const CategoryIds = categoryIds.map(id => new UuidVO(id))
    const RestaurantId = new UuidVO(restaurantId)
    const OwnerId = new UuidVO(ownerId)

    const newDish = new Dish(
      Id,
      Name,
      Description,
      Image,
      Price,
      Allergens,
      CategoryIds,
      RestaurantId,
      OwnerId
    )

    const foundDishById = await this.dishRepository.findById(Id)
    if (foundDishById) throw new DishIdAlreadyInUseException()

    await this.dishRepository.create(newDish)
  }
}
