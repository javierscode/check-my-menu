import { ApplicationConflictException } from './application-conflict.exception'

export class UserEmailAlreadyInUseException extends ApplicationConflictException {
  constructor() {
    super('The user email is already in use')
  }
}
