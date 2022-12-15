export const BACKEND_URL = process.env.BACKEND_URL as string
export const FRONTEND_URL = process.env.FRONTEND_URL as string

export const pageRedirect404 = {
  redirect: {
    destination: '/404',
    permanent: false,
  },
}
