import { EditCategoryRequest } from '@application/use-cases/category/edit-category.usecase'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { ImageVO } from '@domain/value-objects/image.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { CategoryMother } from '@test/domain/mothers/category.entity.mother'
import { MotherCreator } from '@test/domain/mothers/creator.mother'

export class EditCategoryRequestMother {
  static create(
    id: UuidVO,
    name: NameVO,
    description: DescriptionVO,
    image: ImageVO
  ): EditCategoryRequest {
    return {
      id: id.value,
      name: name.value,
      description: description.value,
      image: image.value,
    }
  }

  static random(): EditCategoryRequest {
    const randomCategory = CategoryMother.random()
    return this.create(
      randomCategory.id,
      randomCategory.name,
      randomCategory.description,
      randomCategory.image
    )
  }

  static invalidRequest(): EditCategoryRequest {
    const randomCategory = CategoryMother.random()

    return {
      id: MotherCreator.random().lorem.words(),
      name: randomCategory.name.value,
      description: randomCategory.description.value,
      image: randomCategory.image.value,
    }
  }
}
