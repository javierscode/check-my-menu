import { PriceVO } from '@domain/value-objects/price.vo'

import { MotherCreator } from './creator.mother'

export class PriceVOMother {
  static create(value: number): PriceVO {
    return new PriceVO(value)
  }

  static random(): PriceVO {
    const price = Number(MotherCreator.random().commerce.price())
    return this.create(price)
  }
}
