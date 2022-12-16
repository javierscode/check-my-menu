/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { COOKIE_AUTH_KEY } from '@infrastructure/constants'
import { removeAuthCookie } from '@infrastructure/utils/cookie'
import { isSSR } from '@infrastructure/utils/gssp'
import { MockUserService } from '@test/infrastructure/services/mock-user.service'
import { GetServerSideProps } from 'next'
import { AuthProps, CustomGetServerSideProps } from 'src/types/next'

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
      const auth = { token }
      if (!gssp) return { props: { auth } }
      return await gssp(context, auth)
    }

    if (!token) {
      const auth = { token: null, profile: null }
      if (!gssp) return { props: { auth } }
      return await gssp(context, auth)
    }

    const UserService: MockUserService = new MockUserService()

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
