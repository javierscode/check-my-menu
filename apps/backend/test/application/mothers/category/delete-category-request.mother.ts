import { DeleteCategoryRequest } from '@application/use-cases/category/delete-category.usecase'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class DeleteCategoryRequestMother {
  static create(id: UuidVO): DeleteCategoryRequest {
    return {
      id: id.value,
    }
  }

  static random(): DeleteCategoryRequest {
    return this.create(UuidVOMother.random())
  }

  static invalidRequest(): DeleteCategoryRequest {
    return {
      id: MotherCreator.random().lorem.words(),
    }
  }
}
