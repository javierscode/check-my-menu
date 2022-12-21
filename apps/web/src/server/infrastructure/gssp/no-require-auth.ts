/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { UserService } from '@server/domain/services/user.service'
import { COOKIE_AUTH_KEY } from '@shared/infrastructure/constants'
import { AuthProps, CustomGetServerSideProps } from '@shared/types/next'
import { GetServerSideProps } from 'next'

import { InMemoryUserService } from '../services/inmemory/inmemory-user.service'
import { removeAuthCookie } from '../utils/cookie'
import { isSSR } from '../utils/gssp'

/**
 * AUTHENTICATION IS OPTIONAL
 *  - !authToken && !isSSR-> Props
 *  - !authToken && isSSR -> Props and nextFn
 *  - authToken && !isSSR  -> Props
 *  - authToken && isSSR -> Get profile, nextFn and props
 *    - Error on get profile (so rare) -> Remove cookie and props
 *
 */
export function noRequireAuth<T extends { [key: string]: any }>(
  gssp?: CustomGetServerSideProps<T>
): GetServerSideProps<T & { auth: AuthProps }> {
  return async context => {
    const { req, res } = context
    const token = req.cookies[COOKIE_AUTH_KEY]

    if (!isSSR(context)) {
      const auth = { token: token ?? null, profile: null }
      if (!gssp) return { props: { auth } }
      return await gssp(context, auth)
    }

    if (!token) {
      const auth = { token: null, profile: null }
      if (!gssp) return { props: { auth } }
      return await gssp(context, auth)
    }

    const UserService: UserService = new InMemoryUserService()

    try {
      const profile = await UserService.getProfile(token)

      const auth = { token, profile }
      if (!gssp) return { props: { auth } }
      return await gssp(context, auth)
    } catch {
      removeAuthCookie(res)
      const auth = { token: null, profile: null }
      if (!gssp) return { props: { auth } }
      return await gssp(context, auth)
    }
  }
}
