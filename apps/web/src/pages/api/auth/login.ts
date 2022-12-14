import { UserService } from '@server/domain/services/user.service'
import { FetchUserService } from '@server/infrastructure/services/fetch/fetch-user.service'
import { setAuthCookie } from '@server/infrastructure/utils/cookie'
import { NextApiRequest, NextApiResponse } from 'next'

type TypedBody = {
  email: string
  password: string
}

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  validationMiddleware(req, res)

  const { email, password } = req.body as TypedBody

  const UserService: UserService = new FetchUserService()

  try {
    const { token } = await UserService.login(email, password)

    const profile = await UserService.getProfile(token)

    setAuthCookie(res, token)

    return res.status(200).json({
      token,
      profile,
    })
  } catch (error) {
    return res.status(500).end()
  }
}

function validationMiddleware(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')

  const { email, password, ...rest } = req.body as Record<string, unknown>

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string')
    return res.status(400).send('Missing email or password')
  if (Object.keys(rest).length !== 0) return res.status(400).send('Invalid body')
}
