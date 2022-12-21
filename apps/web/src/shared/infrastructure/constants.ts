export const BACKEND_URL = process.env.BACKEND_URL as string
export const FRONTEND_URL = process.env.FRONTEND_URL as string
export const COOKIE_AUTH_KEY = process.env.COOKIE_AUTH_KEY as string

export const pageRedirect404 = {
  redirect: {
    destination: '/404',
    permanent: false,
  },
}
