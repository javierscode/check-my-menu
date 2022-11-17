import { VOFormatException } from '@domain/exceptions/vo-format.exception'

import { ValueObject } from './value-object'

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/gm

export class SlugVO extends ValueObject<string> {
  public equals(valueObject: SlugVO) {
    return this.value === valueObject.value
  }

  protected assertIsValid(value: string) {
    if (!SLUG_REGEX.test(value)) {
      throw new VOFormatException(SlugVO.name, value)
    }
  }
}
