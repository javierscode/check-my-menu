import { CreateDishRequest } from '@application/use-cases/dish/create-dish.usecase'
import { Dish } from '@domain/entities/dish.entity'
import { AllergenVO } from '@domain/value-objects/allergen.vo'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { ImageVO } from '@domain/value-objects/image.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { PriceVO } from '@domain/value-objects/price.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { AllergenVOMother } from './allergen.vo.mother'
import { DescriptionVOMother } from './description.vo.mother'
import { ImageVOMother } from './image.vo.mother'
import { NameVOMother } from './name.vo.mother'
import { PriceVOMother } from './price.vo.mother'
import { UuidVOMother } from './uuid.vo.mother'

export class DishMother {
  private static create(
    id: UuidVO,
    name: NameVO,
    description: DescriptionVO,
    image: ImageVO,
    price: PriceVO,
    allergens: Array<AllergenVO>,
    categoryIds: Array<UuidVO>,
    ownerId: UuidVO
  ): Dish {
    return new Dish(id, name, description, image, price, allergens, categoryIds, ownerId)
  }

  static fromRequest({
    id,
    name,
    description,
    image,
    price,
    allergens,
    categoryIds,
    ownerId,
  }: CreateDishRequest): Dish {
    return this.create(
      new UuidVO(id),
      new NameVO(name),
      new DescriptionVO(description),
      new ImageVO(image),
      new PriceVO(price),
      allergens.map(allergen => new AllergenVO(allergen)),
      categoryIds.map(id => new UuidVO(id)),
      new UuidVO(ownerId)
    )
  }

  static random(): Dish {
    const randomId = UuidVOMother.random()
    const randomName = NameVOMother.random()
    const randomDescription = DescriptionVOMother.random()
    const randomImage = ImageVOMother.random()
    const randomPrice = PriceVOMother.random()
    const randomAllergen = AllergenVOMother.random()
    const randomCategory = UuidVOMother.random()
    const randomOwnerId = UuidVOMother.random()

    return this.create(
      randomId,
      randomName,
      randomDescription,
      randomImage,
      randomPrice,
      [randomAllergen],
      [randomCategory],
      randomOwnerId
    )
  }
}
