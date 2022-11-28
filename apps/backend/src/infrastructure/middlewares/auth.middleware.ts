import { InfrastructureUnauthorizedException } from '@infrastructure/exceptions/infrastructure-unauthorized.exception'
import { verify } from '@infrastructure/services/jwt.service'
import { NextFunction, Request, Response } from 'express'

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const jwt = req.headers.authorization?.split('Bearer ')?.[1]
    if (!jwt) throw new InfrastructureUnauthorizedException()

    const jwtPayload = (await verify(jwt)) as { id: string }
    req.userId = jwtPayload.id

    next()
  } catch {
    next(new InfrastructureUnauthorizedException())
  }
}
