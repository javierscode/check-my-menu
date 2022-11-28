import { Request } from 'express'

declare module 'express' {
  export interface Request {
    userId?: string
  }
}

export interface TypedRequestBody<T> extends Request {
  body: T
}

export interface TypedRequestParams<T> extends Express.Request {
  params: T
}

export interface AuthRequest extends Express.Request {
  userId: string
}
