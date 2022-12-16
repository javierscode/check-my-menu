import { COOKIE_AUTH_KEY } from '@infrastructure/constants'
import { NextApiRequest, NextApiResponse } from 'next'

export default function refreshHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')

  const token = req.cookies[COOKIE_AUTH_KEY]

  if (!token) return res.status(401).send('Unauthorized')

  return res.status(200).json({
    token,
  })
}
