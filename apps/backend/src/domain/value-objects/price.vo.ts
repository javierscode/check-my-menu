import { VOFormatException } from '@domain/exceptions/vo-format.exception'

import { ValueObject } from './value-object'

export class PriceVO extends ValueObject<number> {
  public equals(valueObject: PriceVO) {
    return this.value === valueObject.value
  }

  protected assertIsValid(value: number) {
    if (value <= 0) {
      throw new VOFormatException(PriceVO.name, value)
    }
  }
}
