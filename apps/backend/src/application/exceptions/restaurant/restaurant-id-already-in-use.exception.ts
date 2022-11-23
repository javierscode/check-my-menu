import { ApplicationConflictException } from '../application-conflict.exception'

export class RestaurantSlugAlreadyInUseException extends ApplicationConflictException {
  constructor() {
    super('The restaurant slug is already in use')
  }
}
