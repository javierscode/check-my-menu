import { ApplicationConflictException } from '@application/exceptions/application-conflict.exception'
import { ApplicationUnauthorizedException } from '@application/exceptions/application-unauthorized.exception'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'express-json-validator-middleware'

export function errorMiddleWare(error: Error, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ValidationError)
    return res
      .status(400)
      .send({ errorMessage: 'Validation Error', errors: error.validationErrors })

  if (error instanceof DomainFormatException)
    return res.status(400).send({ errorMessage: error.message })

  if (error instanceof ApplicationUnauthorizedException)
    return res.status(401).send({ errorMessage: error.message })

  if (error instanceof ApplicationConflictException)
    return res.status(409).send({ errorMessage: error.message })

  return res.status(500).send({ errorMessage: 'Internal server error' })
}
