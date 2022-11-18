import { ApplicationUnauthorizedException } from './application-unauthorized.exception'

export class InvalidUserLoginException extends ApplicationUnauthorizedException {
  constructor() {
    super('Wrong credencials')
  }
}
