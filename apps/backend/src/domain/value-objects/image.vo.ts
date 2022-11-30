import { VOFormatException } from '@domain/exceptions/vo-format.exception'

import { ValueObject } from './value-object'

const IMAGE_REGEX = /([|.|\w|\s|-])*\.(?:jpg|jpeg|png|svg|avif|webp)/

export class ImageVO extends ValueObject<string> {
  public equals(valueObject: ImageVO) {
    return this.value === valueObject.value
  }

  protected assertIsValid(value: string) {
    if (value.length < 3 || !IMAGE_REGEX.test(value)) {
      throw new VOFormatException(ImageVO.name, value)
    }
  }
}
