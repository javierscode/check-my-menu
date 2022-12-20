import { NextApiRequest, NextApiResponse } from 'next'
import QRCode from 'qrcode'

export default async function qrGeneratorHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed')

  const { text } = req.query

  if (!text || typeof text !== 'string') return res.status(400).send('Missing text')

  try {
    const url = await QRCode.toDataURL(text)
    return res.status(200).json({ qr: url })
  } catch (error) {
    return res.status(500).send('Internal server error')
  }
}
