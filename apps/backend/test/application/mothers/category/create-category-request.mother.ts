import { CreateCategoryRequest } from '@application/use-cases/category/create-category.usecase'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { ImageVO } from '@domain/value-objects/image.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { CategoryMother } from '@test/domain/mothers/category.entity.mother'
import { MotherCreator } from '@test/domain/mothers/creator.mother'

export class CreateCategoryRequestMother {
  static create(
    id: UuidVO,
    name: NameVO,
    description: DescriptionVO,
    image: ImageVO,
    restaurantId: UuidVO,
    ownerId: UuidVO
  ): CreateCategoryRequest {
    return {
      id: id.value,
      name: name.value,
      description: description.value,
      image: image.value,
      restaurantId: restaurantId.value,
      ownerId: ownerId.value,
    }
  }

  static random(): CreateCategoryRequest {
    const randomCategory = CategoryMother.random()
    return this.create(
      randomCategory.id,
      randomCategory.name,
      randomCategory.description,
      randomCategory.image,
      randomCategory.restaurantId,
      randomCategory.ownerId
    )
  }

  static invalidRequest(): CreateCategoryRequest {
    const randomCategory = CategoryMother.random()

    return {
      id: MotherCreator.random().lorem.words(),
      name: randomCategory.name.value,
      description: randomCategory.description.value,
      image: randomCategory.image.value,
      restaurantId: randomCategory.restaurantId.value,
      ownerId: randomCategory.ownerId.value,
    }
  }
}
