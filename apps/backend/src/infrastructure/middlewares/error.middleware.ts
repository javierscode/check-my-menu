import { ApplicationConflictException } from '@application/exceptions/application-conflict.exception'
import { ApplicationUnauthorizedException } from '@application/exceptions/application-unauthorized.exception'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { InfrastructureUnauthorizedException } from '@infrastructure/exceptions/infrastructure-unauthorized.exception'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'express-json-validator-middleware'

export function errorMiddleWare(error: Error, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ValidationError)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ errorMessage: 'Validation Error', errors: error.validationErrors })

  if (error instanceof DomainFormatException)
    return res.status(StatusCodes.BAD_REQUEST).send({ errorMessage: error.message })

  if (error instanceof ApplicationUnauthorizedException)
    return res.status(StatusCodes.UNAUTHORIZED).send({ errorMessage: error.message })

  if (error instanceof ApplicationConflictException)
    return res.status(StatusCodes.CONFLICT).send({ errorMessage: error.message })

  if (error instanceof InfrastructureUnauthorizedException)
    return res.status(StatusCodes.UNAUTHORIZED).send({ errorMessage: error.message })

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ errorMessage: 'Internal server error' })
}
