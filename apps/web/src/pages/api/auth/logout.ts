import { removeAuthCookie } from '@server/infrastructure/utils/cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
  validationMiddleware(req, res)

  removeAuthCookie(res)

  return res.status(200).end()
}

function validationMiddleware(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
}
