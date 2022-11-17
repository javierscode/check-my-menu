import { VOFormatException } from '@domain/exceptions/vo-format.exception'

import { ValueObject } from './value-object'

const MAX_LENGTH = 280

export class DescriptonVO extends ValueObject<string> {
  public equals(valueObject: DescriptonVO) {
    return this.value === valueObject.value
  }

  protected assertIsValid(value: string) {
    if (value.length > MAX_LENGTH) {
      throw new VOFormatException(DescriptonVO.name, value)
    }
  }
}
