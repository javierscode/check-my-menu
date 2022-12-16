/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { COOKIE_AUTH_KEY } from '@infrastructure/constants'
import { GetServerSideProps } from 'next'
import { AuthProps, CustomGetServerSideProps } from 'src/types/next'

const REDIRECT = {
  redirect: {
    destination: '/admin',
    permanent: false,
  },
}

/**
 *  REDIRECTS if the user IS AUTHENTICATED
 *  - authToken -> Redirect
 *  - !authToken-> Props
 *  - IsSSR is irrelevant in this case
 *
 */
export function requireNoAuth<T extends { [key: string]: any }>(
  gssp?: CustomGetServerSideProps<T>
): GetServerSideProps<T & { auth: AuthProps }> {
  return async context => {
    const { req } = context
    const token = req.cookies[COOKIE_AUTH_KEY]

    if (token) return REDIRECT

    const auth = { token: null, profile: null }

    if (!gssp) return { props: { auth } }
    return await gssp(context, auth)
  }
}
