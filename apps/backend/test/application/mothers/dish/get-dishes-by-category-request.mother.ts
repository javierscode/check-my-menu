import { GetDishesByCategoryRequest } from '@application/use-cases/dish/get-dishes-by-category.usecase'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class GetDishesByCategoryRequestMother {
  static create(categoryId: UuidVO): GetDishesByCategoryRequest {
    return {
      categoryId: categoryId.value,
    }
  }

  static random(): GetDishesByCategoryRequest {
    return this.create(UuidVOMother.random())
  }

  static invalidRequest(): GetDishesByCategoryRequest {
    return {
      categoryId: MotherCreator.random().lorem.words(),
    }
  }
}
