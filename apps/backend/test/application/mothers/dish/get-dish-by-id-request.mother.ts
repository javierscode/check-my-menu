import { GetDishByIdRequest } from '@application/use-cases/dish/get-dish-by-id.usecase'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class GetDishByIdRequestMother {
  static create(id: UuidVO): GetDishByIdRequest {
    return {
      id: id.value,
    }
  }

  static random(): GetDishByIdRequest {
    return this.create(UuidVOMother.random())
  }

  static invalidRequest(): GetDishByIdRequest {
    return {
      id: MotherCreator.random().lorem.words(),
    }
  }
}
