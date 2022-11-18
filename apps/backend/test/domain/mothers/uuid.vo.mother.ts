import { UuidVO } from '@domain/value-objects/uuid.vo'

import { MotherCreator } from './creator.mother'

export class UuidVOMother {
  static create(value: string): UuidVO {
    return new UuidVO(value)
  }

  static random(): UuidVO {
    return this.create(MotherCreator.random().datatype.uuid())
  }
}
