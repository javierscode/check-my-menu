import { ApplicationConflictException } from '../application-conflict.exception'

export class RestaurantIdAlreadyInUseException extends ApplicationConflictException {
  constructor() {
    super('The restaurant id is already in use')
  }
}
