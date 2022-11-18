import { PasswordVO } from '@domain/value-objects/password.vo'
import { PlainPasswordVO } from '@domain/value-objects/plain-password.vo'

import { MotherCreator } from './creator.mother'

const PASSWORD_LENGTH = 16

export class PasswordVOMother {
  static create(value: string): Promise<PasswordVO> {
    return PasswordVO.create(new PlainPasswordVO(value))
  }

  static random(): Promise<PasswordVO> {
    return this.create(MotherCreator.random().internet.password(PASSWORD_LENGTH))
  }
}
