import { Request } from 'express'

declare module 'express' {
  export interface Request {
    userId?: string
  }
}

export interface TypedRequestBody<T> extends Request {
  body: T
}

export interface TypedRequestParams<T> extends Request {
  params: T
}

export interface TypedRequestQuery<T> extends Request {
  query: T
}

export interface AuthRequest extends Request {
  userId: string
}
