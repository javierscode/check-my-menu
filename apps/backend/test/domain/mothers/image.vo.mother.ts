import { ImageVO } from '@domain/value-objects/image.vo'

import { MotherCreator } from './creator.mother'

export class ImageVOMother {
  private static create(value: string): ImageVO {
    return new ImageVO(value)
  }

  static random(): ImageVO {
    return this.create(
      MotherCreator.random().internet.avatar().replace('https://cloudflare-ipfs.com/ipfs/', '')
    )
  }
}
