import { RestaurantService } from '@server/domain/services/restaurant.service'
import { InMemoryRestaurantService } from '@server/infrastructure/services/inmemory/inmemory-restaurant.service'
import { Restaurant } from '@shared/domain/entities/restaurant'
import { COOKIE_AUTH_KEY } from '@shared/infrastructure/constants'
import { NextApiRequest, NextApiResponse } from 'next'

type TypedBody = Omit<Restaurant, 'id'>

export default async function createRestaurantHandler(req: NextApiRequest, res: NextApiResponse) {
  validationMiddleware(req, res)

  const token = req.cookies[COOKIE_AUTH_KEY] as string
  const { name, domain, location, description } = req.body as TypedBody

  const RestaurantService: RestaurantService = new InMemoryRestaurantService()

  try {
    const restaurant = await RestaurantService.createRestaurant(token, {
      name,
      domain,
      location,
      description,
    })
    return res.status(201).json({ restaurant })
  } catch (error) {
    return res.status(500).end()
  }
}

function validationMiddleware(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  const token = req.cookies[COOKIE_AUTH_KEY]
  if (!token) return res.status(401).send('Unauthorized')
  const { name, domain, location, description, ...rest } = req.body as Record<string, unknown>
  if (
    !name ||
    !domain ||
    !location ||
    !description ||
    typeof name !== 'string' ||
    typeof domain !== 'string' ||
    typeof location !== 'string' ||
    typeof description !== 'string'
  ) {
    return res.status(400).send('Missing name, domain, location or description')
  }
  if (Object.keys(rest).length !== 0) return res.status(400).send('Invalid body')
}
