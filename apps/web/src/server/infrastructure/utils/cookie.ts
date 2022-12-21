import { COOKIE_AUTH_KEY } from '@shared/infrastructure/constants'
import { serialize as serializeCookie } from 'cookie'
import { decode, JwtPayload } from 'jsonwebtoken'
import { GetServerSidePropsContext, NextApiResponse } from 'next'

const SEVEN_DAYS = 60 * 60 * 24 * 7

type Response = NextApiResponse | GetServerSidePropsContext['res']

export const setAuthCookie = (res: Response, token: string) => {
  const tokenPayload = decode(token) as JwtPayload | null

  const authCookie = serializeCookie(COOKIE_AUTH_KEY, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    expires: tokenPayload?.exp
      ? new Date(tokenPayload.exp * 1000)
      : new Date(Date.now() + SEVEN_DAYS),
  })

  res.setHeader('Set-Cookie', authCookie)
}

export const removeAuthCookie = (res: Response) => {
  const emptyAuthCookie = serializeCookie(COOKIE_AUTH_KEY, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  res.setHeader('Set-Cookie', emptyAuthCookie)
}
