import { COOKIE_AUTH_KEY } from '@shared/infrastructure/constants'
import { NextApiRequest, NextApiResponse } from 'next'

export default function refreshHandler(req: NextApiRequest, res: NextApiResponse) {
  validationMiddleware(req, res)
  const token = req.cookies[COOKIE_AUTH_KEY] as string

  return res.status(200).json({
    token,
  })
}

function validationMiddleware(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')

  const token = req.cookies[COOKIE_AUTH_KEY]
  if (!token) return res.status(401).send('Unauthorized')
}
