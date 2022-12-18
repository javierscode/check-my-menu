import { UserService } from '@domain/services/user.service'
import { setAuthCookie } from '@infrastructure/utils/cookie'
import { MockUserService } from '@test/infrastructure/services/mock-user.service'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
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

  const UserService: UserService = new MockUserService()

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
