import { CreateDishRequest } from '@application/use-cases/dish/create-dish.usecase'
import { AllergenVO } from '@domain/value-objects/allergen.vo'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { ImageVO } from '@domain/value-objects/image.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { PriceVO } from '@domain/value-objects/price.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { DishMother } from '@test/domain/mothers/dish.entity.mother'

export class CreateDishRequestMother {
  static create(
    id: UuidVO,
    name: NameVO,
    description: DescriptionVO,
    image: ImageVO,
    price: PriceVO,
    allergens: Array<AllergenVO>,
    categoryIds: Array<UuidVO>,
    ownerId: UuidVO
  ): CreateDishRequest {
    return {
      id: id.value,
      name: name.value,
      description: description.value,
      image: image.value,
      price: price.value,
      allergens: allergens.map(allergen => allergen.value),
      categoryIds: categoryIds.map(DishId => DishId.value),
      ownerId: ownerId.value,
    }
  }

  static random(): CreateDishRequest {
    const randomDish = DishMother.random()
    return this.create(
      randomDish.id,
      randomDish.name,
      randomDish.description,
      randomDish.image,
      randomDish.price,
      randomDish.allergens,
      randomDish.categoryIds,
      randomDish.ownerId
    )
  }

  static invalidRequest(): CreateDishRequest {
    const randomDish = DishMother.random()

    return {
      id: MotherCreator.random().lorem.words(),
      name: randomDish.name.value,
      description: randomDish.description.value,
      image: randomDish.image.value,
      price: randomDish.price.value,
      allergens: randomDish.allergens.map(allergen => allergen.value),
      categoryIds: randomDish.categoryIds.map(categoryId => categoryId.value),
      ownerId: randomDish.ownerId.value,
    }
  }
}
