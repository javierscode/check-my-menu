/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { UserService } from '@server/domain/services/user.service'
import { COOKIE_AUTH_KEY } from '@shared/infrastructure/constants'
import { AuthProps, CustomGetServerSideProps } from '@shared/types/next'
import { GetServerSideProps } from 'next'

import { InMemoryUserService } from '../services/inmemory/inmemory-user.service'
import { removeAuthCookie } from '../utils/cookie'
import { isSSR } from '../utils/gssp'

const REDIRECT = {
  redirect: {
    destination: '/login',
    permanent: false,
  },
}

/**
 * REDIRECTS if the user ISN'T AUTHENTICATED
 *  - !token -> Redirect
 *  - token && !isSSR  -> Props (token)
 *  - token && isSSR -> Get profile and props
 *  - Error on get profile -> Remove cookie and redirect
 */
export function requireAuth<T extends { [key: string]: any }>(
  gssp?: CustomGetServerSideProps<T>
): GetServerSideProps<T & { auth: AuthProps }> {
  return async context => {
    const { req, res } = context
    const token = req.cookies[COOKIE_AUTH_KEY]

    if (!token) return REDIRECT
    if (!isSSR(context)) {
      const auth = { token, profile: null }
      if (!gssp) return { props: { auth } }
      return await gssp(context, auth)
    }
    const UserService: UserService = new InMemoryUserService()

    try {
      const profile = await UserService.getProfile(token)

      const auth = { token, profile }
      if (!gssp) return { props: { auth } }
      return await gssp(context, auth)
    } catch (error) {
      removeAuthCookie(res)
      return REDIRECT
    }
  }
}
