import { compare, hash } from 'bcrypt'

import { PlainPasswordVO } from './plain-password.vo'
import { ValueObject } from './value-object'

const HASH_SALT = 10

export class PasswordVO extends ValueObject<string> {
  public equals(valueObject: PasswordVO) {
    return this.value === valueObject.value
  }

  protected assertIsValid() {
    return true
  }

  public static async create(plainPassword: PlainPasswordVO) {
    const hashedPassword = await hash(plainPassword.value, HASH_SALT)

    return new PasswordVO(hashedPassword)
  }

  public compare(plainPasswordVO: PlainPasswordVO) {
    return compare(plainPasswordVO.value, this.value)
  }
}
