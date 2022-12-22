import { GetCategoryByIdRequest } from '@application/use-cases/category/get-category-by-id.usecase'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class GetCategoryByIdRequestMother {
  static create(id: UuidVO): GetCategoryByIdRequest {
    return {
      id: id.value,
    }
  }

  static random(): GetCategoryByIdRequest {
    return this.create(UuidVOMother.random())
  }

  static invalidRequest(): GetCategoryByIdRequest {
    return {
      id: MotherCreator.random().lorem.words(),
    }
  }
}
