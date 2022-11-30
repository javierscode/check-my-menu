import { ApplicationUnauthorizedException } from '../application-unauthorized.exception'

export class CategoryNotBelongToOwnerException extends ApplicationUnauthorizedException {}
