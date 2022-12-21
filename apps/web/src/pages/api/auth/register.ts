import { UserService } from '@server/domain/services/user.service'
import { InMemoryUserService } from '@server/infrastructure/services/inmemory/inmemory-user.service'
import { NextApiRequest, NextApiResponse } from 'next'
import { setAuthCookie } from 'src/server/infrastructure/utils/cookie'

type TypedBody = {
  name: string
  lastname: string
  email: string
  password: string
}

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
  validationMiddleware(req, res)

  const { name, lastname, email, password } = req.body as TypedBody

  const UserService: UserService = new InMemoryUserService()

  try {
    await UserService.register(name, lastname, email, password)

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

  const { name, lastname, email, password, ...rest } = req.body as Record<string, unknown>

  if (
    !name ||
    !lastname ||
    !email ||
    !password ||
    typeof name !== 'string' ||
    typeof lastname !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  )
    return res.status(400).send('Some field is missing or invalid')

  if (Object.keys(rest).length !== 0) return res.status(400).send('Invalid body')
}
