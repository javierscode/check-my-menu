import { EmailVO } from '@domain/value-objects/email.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { PasswordVO } from '@domain/value-objects/password.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'

export class User {
  constructor(
    public readonly id: UuidVO,
    public name: NameVO,
    public lastname: NameVO,
    public email: EmailVO,
    public password: PasswordVO
  ) {}
}
