import { DishService } from '@server/domain/services/dish.service'
import { FetchDishService } from '@server/infrastructure/services/fetch/fetch-dish.service'
import { COOKIE_AUTH_KEY } from '@shared/infrastructure/constants'
import { NextApiRequest, NextApiResponse } from 'next'

type TypedBody = { id: string }

export default async function deleteDishHandler(req: NextApiRequest, res: NextApiResponse) {
  validationMiddleware(req, res)

  const token = req.cookies[COOKIE_AUTH_KEY] as string
  const { id } = req.body as TypedBody

  const DishService: DishService = new FetchDishService()
  try {
    await DishService.deleteDish(token, id)

    return res.status(201).send('Dish deleted')
  } catch (error) {
    return res.status(500).end()
  }
}

function validationMiddleware(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  const token = req.cookies[COOKIE_AUTH_KEY]
  if (!token) return res.status(401).send('Unauthorized')
  const { id, ...rest } = req.body as Record<string, unknown>
  if (!id || typeof id !== 'string') {
    return res.status(400).send('Missing id')
  }
  if (Object.keys(rest).length !== 0) return res.status(400).send('Invalid body')
}
