import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { AllergenVO } from '@domain/value-objects/allergen.vo'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { ImageVO } from '@domain/value-objects/image.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { PriceVO } from '@domain/value-objects/price.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { Primitives } from 'src/types/primitives'

export class Dish {
  public readonly id: UuidVO
  public name: NameVO
  public description: DescriptionVO
  public image: ImageVO
  public price: PriceVO
  public allergens: Array<AllergenVO>
  public categoryIds: Array<UuidVO>
  public ownerId: UuidVO

  constructor(
    id: UuidVO,
    name: NameVO,
    description: DescriptionVO,
    image: ImageVO,
    price: PriceVO,
    allergens: Array<AllergenVO>,
    categoryIds: Array<UuidVO>,
    ownerId: UuidVO
  ) {
    this.assertIsValid(allergens, categoryIds)
    this.id = id
    this.name = name
    this.description = description
    this.image = image
    this.price = price
    this.allergens = allergens
    this.categoryIds = categoryIds
    this.ownerId = ownerId
  }

  assertIsValid(allergens: Array<AllergenVO>, categoryIds: Array<UuidVO>): void {
    if (allergens.length < 1 || categoryIds.length < 1) {
      throw new DomainFormatException()
    }
  }

  toPrimitives(): Primitives<Dish> {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      image: this.image.value,
      price: this.price.value,
      allergens: this.allergens.map(allergen => allergen.value),
      categoryIds: this.categoryIds.map(categoryId => categoryId.value),
      ownerId: this.ownerId.value,
    }
  }
}
