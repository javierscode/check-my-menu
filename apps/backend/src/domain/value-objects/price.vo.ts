import { VOFormatException } from '@domain/exceptions/vo-format.exception'

import { ValueObject } from './value-object'

export class PriceVO extends ValueObject<number> {
  protected assertIsValid(value: number) {
    if (value <= 0) {
      throw new VOFormatException(PriceVO.name, value)
    }
  }
}
