import { DishService } from '@domain/services/dish.service'
import { COOKIE_AUTH_KEY } from '@infrastructure/constants'
import { MockDishService } from '@test/infrastructure/services/mock-dish.service'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function deleteDishHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  const token = req.cookies[COOKIE_AUTH_KEY]
  if (!token) return res.status(401).send('Unauthorized')
  const { id, ...rest } = req.body as Record<string, unknown>
  if (!id || typeof id !== 'string') {
    return res.status(400).send('Missing id')
  }
  if (Object.keys(rest).length !== 0) return res.status(400).send('Invalid body')

  const DishService: DishService = new MockDishService()
  try {
    await DishService.deleteDish(token, id)

    return res.status(201).send('Dish deleted')
  } catch (error) {
    return res.status(500).end()
  }
}
