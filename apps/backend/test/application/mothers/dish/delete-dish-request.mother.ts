import { DeleteDishRequest } from '@application/use-cases/dish/delete-dish.usecase'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class DeleteDishRequestMother {
  static create(id: UuidVO): DeleteDishRequest {
    return {
      id: id.value,
    }
  }

  static random(): DeleteDishRequest {
    return this.create(UuidVOMother.random())
  }

  static invalidRequest(): DeleteDishRequest {
    return {
      id: MotherCreator.random().lorem.words(),
    }
  }
}
